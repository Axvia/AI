const Discord = require('discord.js')
module.exports = async(client, message) => {
    const embedSoftware = new Discord.MessageEmbed()
    .setColor('#62fcd4')
    .setTitle('BNC Software')
    .setDescription('Advance Brawlhalla Macro by Necode - Version 0.8')
    .addField('Information', 
        `📥 | [Download](https://drive.google.com/file/d/1sCIHBIEDEUpVGNcmiggyt_3UBmllTX-J/view?usp=sharing)\n`+
        `ℹ️ | Version : \`0.8\`\n`+
        `⚙️ | Created by <@!802906117318770688>\n`+
        `💻 | Tested on \`Windows 8\``
    )
    .setFooter(`Reqested by ${message.author.username}`, message.author.displayAvatarURL()).setTimestamp()
    await message.channel.send(embedSoftware)
}
