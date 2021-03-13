async function Index() {
    class AI {
        constructor(ai){
            this.ai         = client;
            this.config     = require('./settings.json');
            this.token      = process.env.Key || this.config.Akashi;
            this.prefix     = this.config.Prefix;
            this.suffix     = this.config.Suffix;
            this.colour     = require('./modules/colours');
            this.client     = client.login(this.token);
            this.today      = new Date(Date.now());
            this.mongo      = require('./modules/schema');
            this.developers = this.config.Developers;
        }
    }
    // ########################## INSTALLED MODULES ##################################### //
    const { Client, Intents, Collection, MessageEmbed, MessageAttachment } = require('discord.js')
    const client = new Client({disableMentions: 'everyone', ws: { intents: Intents.ALL }});
    const { blueBright, greenBright, redBright, grey, yellowBright } = require('chalk')
    
    // ########################### COMMAND MODULES ###################################### //
    const cooldowns = new Collection();
    client.commands = new Collection();
    client.aliases = new Collection();
    const handlers = require('./commands/handlers/command')
    handlers(client)

    // ############################ CUSTOM FUNCTIONS ###################################### //
    const exCommand = async function exCommand(data, category, path, client, message) { 
        return require(`${path}commands/${category}/${data}.js`)(client, message) 
    }

    // ############################ CUSTOM MODULES ###################################### //
    const { Console, channelID, Command, DMchannel, hasID, timeAgo } = require('./modules/utility')
    const ai = new AI(client)

    // ############################# General Messaging ####################################### //
    client.on('message', async(message)=>{
        if (message.author.bot) return;
        if (await DMchannel(message)) return false;
        // Arguments input
        const args = message.content.slice(ai.prefix.length).trim().split(/ +/);
        if (await channelID(message, "806139190164717568")) {
            if (await  Command(message, 'brawlhalla', { prefix: "!" })) {
                await exCommand("brawlhalla", "software", './', client, message).catch(() => {})
            }
        }
        if (await hasID(message, '802906117318770688') || await hasID(message, '714486020594204754')) {
            if (await Command(message, "loyalty", { prefix: ai.prefix })) {
                if (!args[1]) {
                    await message.channel.send(timeAgo(Date.parse(message.member.joinedAt)))
                } else {
                    const user = message.guild.members.cache.get(args[1])
                    if (!user) return message.channel.send("Invalid ID")
                    await message.channel.send(timeAgo(Date.parse(user.joinedAt)))
                }
            }
            if (await Command(message, "time", { prefix: ai.prefix })) {
                if (!args[1]) {
                    await message.channel.send(timeAgo(Date.parse(message.author.createdAt)))
                } else {
                    const user = message.guild.members.cache.get(args[1])
                    if (!user) return message.channel.send("Invalid ID")
                    await message.channel.send(timeAgo(Date.parse(user.user.createdAt)))
                }
            }
        }
        if (ai.config.badWords.some(words => message.content.toLowerCase().includes(words))) {
            if (ai.developers.some(devID => message.author.id === devID)) return;
            await message.react()
        }
    })

    // ############################# Guild Commands ####################################### //
    const { InGuild } = require('./settings.json')
    client.on('message', async(message)=>{
        if (message.author.bot) return;
        if (await DMchannel(message)) return false;
        if (message.guild.id === InGuild.Disproberry) {
            const { guildCommands } = require('./guilds/Disproberry/messages/guildCommands')
            await guildCommands(client, message, ai.prefix)
        }
    })
    
    // ############################# Raw Event ####################################### //
    client.on('raw', async packet => {
        try {
            if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
            let userID = packet.d.user_id;
            let messageID = packet.d.message_id;
            let emojiID = (packet.d.emoji.id || packet.d.emoji.name) // (packet.d.emoji.id) ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
            let channelID = packet.d.channel_id;
            // -- Don't do anything if the user is bot.
            if (userID === client.user.id) return;
            // -- Channel/Message/Reaction
            let CHANNEL = client.channels.cache.get(channelID)
            let MESSAGE = CHANNEL.messages.cache.get(messageID) || (await CHANNEL.messages.fetch(messageID))
            let REACTION = MESSAGE.reactions.cache.get(emojiID)
            // -- Emit
            if (packet.t === 'MESSAGE_REACTION_ADD') {
                client.emit('messageReactionAdd', REACTION, client.users.get(userID))
            }
            if (packet.t === 'MESSAGE_REACTION_REMOVE') {
                client.emit('messageReactionRemove', REACTION, client.users.get(userID))
            }
        } catch (e) {
            return; // -- Ignore
        }
    });

    // ############################# Extra listener ####################################### //
    client.addListener('message', async(message) => {
        let messageCreated = require('./events/messageCreated');
        await messageCreated(client, message, ai.prefix, cooldowns, ai.developers);
    })
    client.addListener('messageDelete', async(message) => {
        let messageDeleted = require('./events/messageDeleted');
        await messageDeleted(client, message);
    })
    client.addListener('channelDelete', async(channel) => {
        let channelDeleted = require('./events/channelDeleted');
        await channelDeleted(client, channel);
    })
    client.addListener('messageUpdate', async(message, oldMessage) => {
        let messageUpdate = require('./events/messageUpdate');
        await messageUpdate(client, message, oldMessage);
    })
    client.addListener('roleDelete', async(role) => {
        let roleDeleted = require('./events/roleDeleted');
        await roleDeleted(client, role);
    })
    client.addListener('guildMemberAdd', async(member) => {
        let memberJoin = require('./events/memberJoin');
        await memberJoin(client, member);
    })
    client.addListener('guildMemberRemove', async(member) => {
        let memberLeave = require('./events/memberLeave');
        await memberLeave(client, member);
    })
    client.addListener('messageReactionAdd', async(reaction, user) => {
        let ReactionAdd = require('./events/ReactionAdd');
        await ReactionAdd(client, reaction, user);
    })
    client.addListener('messageReactionRemove', async(reaction, user) => {
        let ReactionRemove = require('./events/ReactionRemove');
        await ReactionRemove(client, reaction, user);
    })

    // ################################################################################## //
    client.on('ready', ()=> {
        Console(
            `${grey(`[DB-JS]`)} Client:     ${yellowBright(`${client.user.username}`)}\n`+
            `${grey(`[DB-JS]`)} ID:         ${yellowBright(`${client.user.id}`)}\n`+
            `${grey(`[DB-JS]`)} Prefix:     ${yellowBright(`${ai.prefix}`)}\n`+
            `${grey(`[DB-JS]`)} Suffix:     ${yellowBright(`${ai.suffix}`)}\n`+
            `${grey(`[DB-JS]`)} Tag:        ${yellowBright(`${client.user.tag}`)}\n`+
            `${grey(`[DB-JS]`)} Time:       ${yellowBright(`${ai.today.toDateString()} - ${ai.today.toLocaleTimeString()}`)}`
        )
        client.user.setActivity(`${client.users.cache.size.toString()} users with ${ai.prefix}`, {
            type: 'LISTENING',
        }).then(LoopStatus())
    });

    function LoopStatus(){
        setInterval(() => {
            client.user.setActivity(`${client.users.cache.size.toString()} users with ${ai.prefix}`, {
                type: 'LISTENING',
            })
        }, 600000);
    }

    // ################################################################################## //
    // Handle shard error
    const now = new Date(Date.now()).toLocaleTimeString()
    client.on('shardError', m =>                    { Console(`Shard Error: ${redBright(`${m}`)}`) })
    client.on('shardReconnecting', m =>             { Console(`Shard ${blueBright(`${m}`)}: Reconnecting at ${now}`) })
    client.on('shardDisconnect', m =>               { Console(`Shard ${blueBright(`${m}`)}: Disconnected at ${now}`) })
    client.on('shardReady', m =>                    { Console(`Shard ${greenBright(`${m}`)}: Ready at ${now}`) })
    client.on('shardResume', m =>                   { Console(`Shard ${yellowBright(`${m}`)}: Resume at ${now}`) })
    
    // Warning and Error
    client.on('warn', w =>                          { Console('Warn', `Warning: ${redBright(`${w}`)}`) })
    client.on('error', e =>                         { Console('Error', `Error: ${redBright(`${e}`)}`) })
    
    // Connection Error
    client.on('disconnect', () =>                   { Console(`\x1b[32m${client.user.username}\x1b[0m : Disconected.`) });
    client.on('reconnecting', () =>                 { Console(`\x1b[32m${client.user.username}\x1b[0m  : Reconnecting.`) })
    
    // Error Messages
    process.on('uncaughtException', error =>        { Console(`Uncaught-exception: ${redBright(`${error}`)}`)});
    process.on('unhandledRejection', error =>       { Console(`Unhandled-promise-rejection: ${redBright(`${error}`)}`)})
    process.on('uncaughtExceptionMonitor', error => { Console(`Uncaught-exception-monitor: ${redBright(`${error}`)}`)})
    
    // ################################################################################## //
} Index().catch(err => console.log(`${err}`));