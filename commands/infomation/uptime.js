const Discord = require('discord.js')
const { Prefix, CommandsHyperlink } = require('../../settings.json')

module.exports = {
    name: `uptime`,
    desc: `Displays bot uptime`,
    usage: `\`${Prefix}uptime\``,
    category: `Information`,
    accessibly: `Everyone`,
    aliases: ['uptime'],
    cooldown: 10,
    details: `uptime`, //[uptime](${CommandsHyperlink} 'Displays bot uptime')
    permissions: [ ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            // -- Up Time
            async function Uptime() {
                let totalSeconds = (client.uptime / 1000);
                let days = Math.floor(totalSeconds / 86400);
                let hours = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes = Math.floor(totalSeconds / 60);
                let seconds = Math.floor(totalSeconds % 60);
                let uptime = `${days} Days ${hours} Hours ${minutes} Mminutes ${seconds} Seconds`;
                return uptime;
            }
            await message.channel.send(`${await Uptime() || "Sorry, I forgot when I wake up."}`)
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
