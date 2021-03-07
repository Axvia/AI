const { Collection } = require('discord.js')
const { whitelist, messageFilter, swearWords } = require('../modules/schema')
module.exports = async function messageCreated(client, message, Prefix, cooldowns, developers) {
    async function CommandExecutor() {
        if (message.author.bot) return; // Ignore other bots

        // Must run when prefix provided
        if (!message.content.startsWith(Prefix)) return false;

        // Argument --- Latest
        const args = message.content.slice(Prefix.length).trim().split(/ +/);

        // Command handlers
        const commandName = args.shift().toLowerCase();
        if (commandName.length === 0) return;
        if (!commandName) return;

        // Commands aliases.
        let myCommand = client.commands.get(client.aliases.get(commandName)||commandName);
        if (!myCommand) return;

        // Commands cooldown.
        if(!cooldowns.has(myCommand.name)){
            cooldowns.set(myCommand.name, new Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(myCommand.name);
        const cooldownAmount = (myCommand.cooldown || 2 /*3sec*/) * 1000
        
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now)/1000;
                await message.delete().catch(()=>{});
                return message.channel.send(`${message.member.nickname||message.author.username}, please cool down! **(** \`${myCommand.name}\` | **${timeLeft.toFixed(1)}** second(s) left **)** `).then(replies => replies.delete({timeout:5000}));
            }
        } else {
            timestamps.set(message.author.id, now); // -- Add cooldown
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount); // -- Remove cooldown
        }

        // Launch the commands
        try {
            whitelist.find({ // -- Whitelist channel so the bot can execute the commands
                serverID: message.guild.id,
                ChannelID: message.channel.id,
            }, async (error, data) => {
                if (error) return console.log('Whitelist Channels - Error :: '+error)
                const whitelistedinServer = data.map(data => data.serverID)
                const whitelistedChannel = data.map(data => data.ChannelID)
                if (whitelistedinServer.some(dataServerID => message.guild.id === dataServerID) && whitelistedChannel.some(dataChannelID => message.channel.id === dataChannelID)) {
                    
                    // To all members(including developers)
                    if (timestamps.has(message.author.id)) {
                        await myCommand.launch(client, message, args);
                    }
                
                } else {

                    // To all developers not for members
                    if (developers.includes(message.author.id)) {
                        if (timestamps.has(message.author.id)) {
                            await myCommand.launch(client, message, args);
                        }
                    }

                }
            })
            
        } catch (err) { 
            return; 
        }
    } CommandExecutor().catch(err => console.log(`Failed to process message. Error :: ${err} :: Please fix the script carefully!`))

    async function Messages() {
        if (message.author.bot) return; ; // Ignore other bots

        // Filter Messages
        messageFilter.findOne({
            serverID: `${message.guild.id}_MessageFilter`,
        }, async(error, data) => {
            if (error) return console.log(`MongoDB Error :: [${error}] :: Error.`);
            try {
                const allowedRolestoText = data.allowRolestoText;
                const allowedRolestoLink = data.allowRolestoLink;
                const channeltofilterText = data.filterText;
                const channeltofilterLink = data.filterLink;
                const thisGuild = String(data.serverID).replace("MessageFilter", "").replace("_", "")
                if (message.guild.id === thisGuild) {

                    // Text
                    if (channeltofilterText.includes(message.channel.id)) {
                        if (allowedRolestoText.some(role => message.member.roles.cache.has(role))) {
                            console.log(`User ${message.author.username} allowed to bypass Filter Text`)
                        } else {
                            if (message.content !== "") { // Allow all attachments
                                await message.delete().catch(()=>{}).then(async function() { // Delete any messages including links
                                    await message.channel.send(`<@!${message.author.id}> text messages are not allowed in this channel.`).then(reply =>reply.delete({timeout:5000}).catch(()=>{}))
                                })
                            }
                        }
                    }

                    // Link
                    if (channeltofilterLink.includes(message.channel.id)) {
                        if (allowedRolestoLink.some(role => message.member.roles.cache.has(role))) {
                            console.log(`User ${message.author.username} allowed to bypass Filter Link`)
                        } else {
                            if (message.content.includes("http://") || message.content.includes("https://")) {
                                await message.delete().catch(()=>{}).then(async function() {
                                    await message.channel.send(`<@!${message.author.id}> links are not allowed in this channel.`).then(reply =>reply.delete({timeout:5000}).catch(()=>{}))
                                })
                            }
                        }
                    }
                }
            } catch (error) {
                return;
            }
        })

        // Swear words
        swearWords.findOne({
            serverID: `${message.guild.id}_swearWords`
        }, async(error, data) => {
            if (error) return console.log(`MongoDB Error :: [${error}] :: Error.`)
            try {
                const blockedWordsList = data.blockedWords;
                const thisGuild = String(data.serverID).replace("swearWords", "").replace("_", "")
                if (message.guild.id === thisGuild) {
                    blockedWordsList.forEach(async words => {
                        if (message.content.includes(words)) {
                            await message.delete().catch(()=>{})
                        }
                    })
                }
            } catch (error) {
                return;
            }
        })
        
    } Messages().catch(err => console.log(`Failed to process message. Error :: ${err} :: Please fix the script carefully!`))

    async function History() {
        if (message.author.bot) return;
        // -- Delete DM History
        if (message.channel.type === 'dm' && message.content.startsWith('clear')) { 
            message.react('🆗').catch(()=>{})
            let fetchDMChannel = message.channel.messages.fetch({limit:50})
            fetchDMChannel.then(msgs=>msgs.filter(m => m.author.id === client.user.id).map(r => r.delete())).then(
                await message.author.deleteDM().catch(() => {})
            )
        }
    } History().catch(err => console.log(`Failed to process message. Error :: ${err} :: Please fix the script carefully!`))

}