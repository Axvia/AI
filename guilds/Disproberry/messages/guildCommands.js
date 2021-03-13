const { MessageEmbed } = require('discord.js')
module.exports = class Commands {
    static async guildCommands(client, message, Prefix) {
        if (message.author.id !== ("802906117318770688")) return false;
        if (message.content.startsWith(Prefix + "Disproberry_Reaction_Miscellaneos_Roles")) {
            const embed = new MessageEmbed()
            .setColor("BLUE").setAuthor("Miscellaneous | Reaction Roles")
            .setDescription(
                `💻 | **Programmer**\n`+
                `🎮 | **Gamer**\n`+
                `⚔️ | **Brawlhalla**`
            )
            .setTimestamp().setFooter('Tips: Unreact your emoji will remove your roles.')
            await message.channel.send(embed).then(async function(msg) {
                await msg.react("💻");
                await msg.react("🎮");
                await msg.react("⚔️")
            })
        }
        if (message.content.startsWith(Prefix + "Disproberry_Reaction_Roles")) {
            const embedP1 = new MessageEmbed()
            .setColor("#5bfcf2")
            .setAuthor(`${message.guild.name} | Reaction Roles`, `${message.guild.iconURL({dynamic:true})}`)
            .setDescription
            (
                `<:Python:817060026824523828> | <@&816844650320756807>\n`+
                `<:JavaScript:817059948676382721> | <@&816845462338404373>\n`+
                `<:Nodejs:817060005169725440> | <@&816845670827687956>\n`+
                `<:Java:817059933848862721> | <@&816846084018143273>\n`+
                `<:Csharp:817059875179724840> | <@&816846084135321652>`
            )
            .setTimestamp().setFooter('Tips: Unreact your emoji will remove your roles.')
            const embedP2 = new MessageEmbed()
            .setColor("#5bfcf2")
            .setAuthor(`${message.guild.name} | Reaction Roles`, `${message.guild.iconURL({dynamic:true})}`)
            .setDescription
            (
                `<:Clang:817059834750173226> | <@&816846624160219170>\n`+
                `<:Cplus:817059854124318770> | <@&816846690362327040>\n`+
                `<:Go:817059892179238931> | <@&816847733968601119>\n`+
                `<:TypeScript:817060097318191104> | <@&816848006279331850>\n`+
                `<:Rust:817060062417649735> | <@&816848283933736961>`
            )
            .setTimestamp().setFooter('Tips: Unreact your emoji will remove your roles.')
            const embedP3 = new MessageEmbed()
            .setColor("#5bfcf2")
            .setAuthor(`${message.guild.name} | Reaction Roles`, `${message.guild.iconURL({dynamic:true})}`)
            .setDescription
            (
                `<:HTMLCSS:817059912806432818> | <@&816848574780276810>\n`+
                `<:Ruby:817060049544544296> | <@&816848995136569355>\n`+
                `<:Kotlin:817059970687696936> | <@&816849604371808296>\n`+
                `<:Swift:817060079576678460> | <@&816849638388006913>\n`+
                `<:Lua:817059986508087319> | <@&816849648429957153>`
            )
            .setTimestamp().setFooter('Tips: Unreact your emoji will remove your roles.')
    
            const reactionP1 = ["817060026824523828", "817059948676382721", "817060005169725440", "817059933848862721", "817059875179724840"]
            const reactionP2 = ["817059834750173226", "817059854124318770", "817059892179238931", "817060097318191104", "817060062417649735"]
            const reactionP3 = ["817059912806432818", "817060049544544296", "817059970687696936", "817060079576678460", "817059986508087319"]
    
            const msgP1 = await message.channel.send(embedP1)
            const msgP2 = await message.channel.send(embedP2)
            const msgP3 = await message.channel.send(embedP3)
            
            reactionP1.forEach(async(eID) => {
                await msgP1.react(eID)
            })
            reactionP2.forEach(async(eID) => {
                await msgP2.react(eID)
            })
            reactionP3.forEach(async(eID) => {
                await msgP3.react(eID)
            })
        }
    }
}