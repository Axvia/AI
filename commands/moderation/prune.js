const Discord = require('discord.js')
const { Prefix, CommandsHyperlink } = require('../../settings.json')

module.exports = {
    name: `prune`,
    desc: `Delete multiple messages. Maximum 100 messages.`,
    usage: `\`${Prefix}prune [text|old|link] <amount> \``,
    category: `Moderation`,
    accessibly: `Moderator`,
    aliases: ["prune"],
    cooldown: 5,
    details: `[prune](${CommandsHyperlink} 'Delete multiple messages. Maximum 100 messages.')`,
    permissions: [ "Manage Roles" ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            if (!message.member.roles.cache.find(role => role.name === "Moderator")) return message.channel.send("Moderator role required!");
            if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`Missing Permission to \`Manage Messages\``) 
            const Options = args[0];
            const Amount = args[1];
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
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
