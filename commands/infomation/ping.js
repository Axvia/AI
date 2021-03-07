const Discord = require('discord.js')
const { Prefix, CommandsHyperlink } = require('../../settings.json')

module.exports = {
    name: `ping`,
    desc: `Check the bot response time.`,
    usage: `\`${Prefix}ping\``,
    category: `Information`,
    accessibly: `Everyone`,
    aliases: ['ping'],
    cooldown: 10,
    details: `[ping](${CommandsHyperlink} 'Check the bot response time')`,
    permissions: [ ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            message.channel.send(':ping_pong: | Pong...').then(sent => {
                let ping = sent.createdTimestamp - message.createdTimestamp
                sent.edit(`:ping_pong: | Pong! - Client: **${ping}ms** | API: **${Math.round(client.ws.ping)}ms**`);
            });
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
