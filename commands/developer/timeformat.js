const { MessageEmbed } = require('discord.js')
const { Prefix, CommandsHyperlink, Developers } = require('../../settings.json')

module.exports = {
    name: `time_format`,
    desc: `Display time format in JS`,
    usage: `\`${Prefix}time_format\``,
    category: `Developer`,
    accessibly: `Developer`,
    aliases: [ ],
    cooldown: 0,
    details: `time_format`,
    permissions: [ ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            if (!Developers.includes(message.author.id)) return;
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
            .setFooter(`${client.user.tag} • ${today.toLocaleTimeString()}`, client.user.displayAvatarURL())
            await message.channel.send(embed)
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
