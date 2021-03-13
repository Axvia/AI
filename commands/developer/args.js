const { MessageEmbed } = require('discord.js')
const { Prefix, CommandsHyperlink, Developers } = require('../../settings.json')

module.exports = {
    name: `args`,
    desc: `Display argument input`,
    usage: `\`${Prefix}args [text]\``,
    category: `Developer`,
    accessibly: `Developer`,
    aliases: [ ],
    cooldown: 0,
    details: `args`,
    permissions: [ ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            if (!Developers.includes(message.author.id)) return;
            await message.channel.send(`- Args 0: '${args[0] || 'Null'}'\n- Args 1: '${args[1] || 'Null'}'\n- Args 2: '${args[2] || 'Null'}'\n- Args 3: '${args[3] || 'Null'}'\n- Args 4: '${args[4] || 'Null'}'\n- Args 5: '${args[5] || 'Null'}'`, { code: 'fix' })    
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
