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
    const fs = require('fs')
    const cooldowns = new Collection();
    client.commands = new Collection();
    client.aliases = new Collection();
    const handlers = require('./commands/handlers/command')
    handlers(client)

    // ############################ CUSTOM FUNCTIONS ###################################### //
    const exCommand = async function exCommand(data, category, client, message) { 
        return require(`./commands/${category}/${data}.js`)(client, message) 
    }

    // ############################ CUSTOM MODULES ###################################### //
    const { Console, channelID, Command, Send, DMchannel, hasID, hasRole, timeAgo } = require('./modules/utility')
    const ai = new AI(client)

    // ############################# MESSAGING ####################################### //
    client.on('message', async(message)=>{
        if (message.author.bot) return;
        if (await DMchannel(message)) return false;
        if (await channelID(message, "806139190164717568")) {
            if (await  Command(message, 'brawlhalla', { prefix: ai.prefix })) {
                await exCommand("brawlhalla", "software", client, message).catch(() => {})
            }
        }
        const args = message.content.slice(ai.prefix.length).trim().split(/ +/);
        if (await hasID(message, '802906117318770688') || await hasID(message, '714486020594204754')) {
            if (await Command(message, 'args', { prefix: ai.prefix })) {
                message.channel.send(`- Args 1: '${args[1] || 'Null'}'\n- Args 2: '${args[2] || 'Null'}'\n- Args 3: '${args[3] || 'Null'}'\n- Args 4: '${args[4] || 'Null'}'\n- Args 5: '${args[5] || 'Null'}'`, { code: 'fix' })
            }
            if (await Command(message, 'password', { prefix: ai.prefix })) {
                await message.channel.send(`${await Mod.Password(16) || "I broke the code"}`)
            }
            if (await Command(message, "foo", { prefix: ai.prefix })) {
                await Send(message, "bar", false, { emoji: undefined })
            }
            if (await Command(message, "loyalty", { prefix: ai.prefix })) {
                if (!args[1]) {
                    await message.channel.send(timeAgo(Date.parse(message.member.joinedAt)))
                } else {
                    const user = message.guild.members.cache.get(args[1])
                    if (!user) return message.channel.send("Invalid ID")
                    await message.channel.send(timeAgo(Date.parse(user.joinedAt)))
                }
            }
            if (await Command(message, 'time format', {prefix : ai.prefix})) {
                const today = new Date(Date.now())
                const content = [
                    `1. Locale Date String: ${today.toLocaleDateString()}\n`+
                    `2. Locate Time String: ${today.toLocaleTimeString()}\n`+
                    `3. Locate String: ${today.toLocaleString()}\n`+
                    `4. Date String: ${today.toDateString()}\n`+
                    `5. ISO String: ${today.toISOString()}\n`+
                    `6. String: ${today.toString()}\n`+
                    `7. Time String: ${today.toTimeString()}\n`+
                    `8. UTC String: ${today.toUTCString()}`
                ]
                const embed = new MessageEmbed().setColor("GOLD")
                .setDescription(`\`\`\`ps` + '\n' + content + `\n` + `\`\`\``)
                .setFooter(`${client.user.tag} • ${today.toString()}`, client.user.displayAvatarURL())
                await message.channel.send(embed)
            }
            if (await Command(message, 'purge', { prefix: ai.prefix })) {
                if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`Missing Permission to \`Manage Messages\``) 
                const Options = args[1];
                const Amount = args[2];
                if (Options === 'text') {
                    if (!Amount) return message.channel.send('Please provide a numeric input!');
                    if (isNaN(Amount)) return message.channel.send('Please provide a valid numeric input!');
                    if (Amount > 100) return message.channel.send('Uh oh, the amout you provided too high.');
                    const fetchChannel = await message.channel.messages.fetch({limit:Amount})
                    fetchChannel.filter(msg => {if (typeof msg.content === 'string') return msg.content}).map(msg => msg.delete().catch(()=>{}))
                } else if (Options === 'old') {
                    if (!Amount) return message.channel.send('Please provide a numeric input!');
                    if (isNaN(Amount)) return message.channel.send('Please provide a valid numeric input!');
                    if (Amount > 100) return message.channel.send('Uh oh, the amout you provided too high.');
                    const fetchChannel = await message.channel.messages.fetch({limit:Amount})
                    fetchChannel.map(msg => msg.delete().catch(()=>{}))
                } else if (Options === 'link') {
                    if (!Amount) return message.channel.send('Please provide a numeric input!');
                    if (isNaN(Amount)) return message.channel.send('Please provide a valid numeric input!');
                    if (Amount > 100) return message.channel.send('Uh oh, the amout you provided too high.');
                    const fetchChannel = await message.channel.messages.fetch({limit:Amount})
                    fetchChannel.filter(msg => msg.content.includes('http') || msg.content.includes('https')).map(msg => msg.delete().catch(()=>{}))
                } else {
                    if (!Options) return message.channel.send('Please provide a numeric input!');
                    if (isNaN(Options)) return message.channel.send('Please provide a valid numeric input!');
                    if (Options > 100) return message.channel.send('Uh oh, the amout you provided too high.');
                    await message.delete().catch(()=>{})
                    await message.channel.bulkDelete(Options, true).catch(e => {}).then(messages => message.channel.send(`🚮 | Deleted ${messages.size}/${Options} messages.`)).then(lastMsg => lastMsg.delete({timeout: 2000}))
                }
            }
        }
    })

    // ############################# Guild Commands ####################################### //
    client.on('message', async(message)=>{
        if (message.author.bot) return;
        if (await DMchannel(message)) return false;
        if (message.guild.id === "771560955099611187") {
            const { guildCommands } = require('./guilds/Discord.kyz/messages/guildCommands')
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
        }).then(function() { 
            Activity();
            readyLog('811756217453117461');
        })
    });

    function Activity(){
        setInterval(() => {
            client.user.setActivity(`${client.users.cache.size.toString()} users with ${ai.prefix}`, {
                type: 'LISTENING',
            })
        }, 600000);
    }

    async function readyLog(channelLogs) {
        const now = new Date(Date.now()).toLocaleTimeString()
        const channel = client.channels.cache.get(channelLogs)
        const embed = new MessageEmbed()
        .setColor('#70f7c1')
        .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL()}`)
        .setDescription(`System has been restarted at \`${now}\`.\nPossible causes:\n> ・ Dyno restarted\n> ・ Development process`)
        await channel.send(embed).catch(()=>{})
    }

    async function reconnect(channelLogs) {
        const now = new Date(Date.now()).toLocaleTimeString()
        const channel = client.channels.cache.get(channelLogs)
        const embed = new MessageEmbed()
        .setColor("BLUE")
        .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL()}`)
        .setDescription(` ${client.user.username} :  \`${now}\`\n> Reconnecting.`)
        await channel.send(embed).catch(()=>{})
    }
    async function disconnect(channelLogs) {
        const now = new Date(Date.now()).toLocaleTimeString()
        const channel = client.channels.cache.get(channelLogs)
        const embed = new MessageEmbed()
        .setColor("RED")
        .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL()}`)
        .setDescription(` ${client.user.username} :  \`${now}\`\n> Diconnected.`)
        await channel.send(embed).catch(()=>{})
    }
    async function resume(channelLogs) {
        const now = new Date(Date.now()).toLocaleTimeString()
        const channel = client.channels.cache.get(channelLogs)
        const embed = new MessageEmbed()
        .setColor("PURPLE")
        .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL()}`)
        .setDescription(` ${client.user.username} :  \`${now}\`\n> Resume.`)
        await channel.send(embed).catch(()=>{})
    }

    // ################################################################################## //
    // Handle shard error
    client.on('shardError', m =>                    { /**Console(`Shard Error: ${redBright(`${m}`)}`)*/ console.clear(); })
    client.on('shardReconnecting', m =>             { /**Console(`Shard ${blueBright(`${m}`)}: Reconnecting`)*/ reconnect('811756217453117461') })
    client.on('shardDisconnect', m =>               { /**Console(`Shard ${blueBright(`${m}`)}: Disconnected`)*/ disconnect('811756217453117461') })
    client.on('shardReady', m =>                    { /**Console(`Shard ${greenBright(`${m}`)}: Ready`)*/ })
    client.on('shardResume', m =>                   { /**Console(`Shard ${yellowBright(`${m}`)}: Resume`)*/ resume('811756217453117461') })
    
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