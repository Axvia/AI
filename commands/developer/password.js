const Discord = require('discord.js')
const { Prefix, CommandsHyperlink, Developers } = require('../../settings.json')

module.exports = {
    name: `password`,
    desc: `Generate random password`,
    usage: `\`${Prefix}password <input>\``,
    category: `Developer`,
    accessibly: `Developer`,
    aliases: ["password"],
    cooldown: 0,
    details: `[password](${CommandsHyperlink} 'Generate random password')`,
    permissions: [ ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            if (!Developers.includes(message.author.id)) return;
            async function Password(length) {
                var result           = '';
                var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;
                for ( var i = 0; i < length; i++ ) {
                   result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
            }
            message.channel.send(`${await Password(16) || "Sorry, I can't generate random password"}`)
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
