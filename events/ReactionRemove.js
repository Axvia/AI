const { InGuild } = require('../settings.json')
module.exports = async function ReactionRemove(client, reaction, user){
    async function Reaction() {
        const config = {
            itsMe: reaction.me,
            isBot: user.bot,
            emojiID: reaction.emoji.id,
            emojiName: reaction.emoji.name,
            isAuthorBot: reaction.message.author.bot, // Message other bot
            channel: reaction.message.channel,
            guildName: reaction.message.guild.name,
            guildID: reaction.message.guild.id,
            channelName: reaction.message.channel.name,
            channelID: reaction.message.channel.id,
            messageID: reaction.message.id,
            isDM: reaction.message.channel.type === "dm",
            userTag: user.tag,
            userIcon: user.displayAvatarURL({dynamic:true, size:512, format:"png"}),
            userID: user.id,
            userUsername: user.username,
            hasPermissionManageRoles: reaction.message.guild.me.hasPermission('MANAGE_ROLES'),
            hasPermissionManageMessages: reaction.message.guild.me.hasPermission('MANAGE_MESSAGES'),
            memberRoleData: reaction.message.guild.members.cache.get(user.id).roles.cache,
            memberRole: reaction.message.guild.members.cache.get(user.id).roles
        }
        /**Ignore user bot*/
        if (config.isBot) return;
        /**########################################################################################*/
        if (config.guildID === InGuild.Disproberry/**&& config.messageID === ""*/)  {
            let {  removeRole } = require('../guilds/Disproberry/reactions/reactionManager');
            /**Give/Remove role if client have permission to manage roles*/
            if (config.hasPermissionManageRoles) {
                if (config.messageID === "817232785835294752") {
                    if (config.emojiName === "💻") { // Programmer
                        await removeRole(config.memberRoleData, config.memberRole, "816852595246104646")
                    }
                    if (config.emojiName === "🎮") { // Gamer
                        await removeRole(config.memberRoleData, config.memberRole, "816861785449037844")
                    }
                    if (config.emojiName === "⚔️") { // Brawhalla
                        await removeRole(config.memberRoleData, config.memberRole, "816851313211998228")
                    }
                }
                if (config.emojiID === "817060026824523828") { // Python // RoleID : 816844650320756807
                    await removeRole(config.memberRoleData, config.memberRole, "816844650320756807")
                }
                if (config.emojiID === "817059948676382721") { // JavaScript // RoleID : 816845462338404373
                    await removeRole(config.memberRoleData, config.memberRole, "816845462338404373")
                }
                if (config.emojiID === "817060005169725440") { // Nodejs // RoleID : 816845670827687956
                    await removeRole(config.memberRoleData, config.memberRole, "816845670827687956")
                }
                if (config.emojiID === "817059933848862721") { // Java // RoleID : 816846084018143273
                    await removeRole(config.memberRoleData, config.memberRole, "816846084018143273")
                }
                if (config.emojiID === "817059875179724840") { // Csharp // RoleID : 816846084135321652
                    await removeRole(config.memberRoleData, config.memberRole, "816846084135321652")
                }
                if (config.emojiID === "817059834750173226") { // Clang // RoleID : 816846624160219170
                    await removeRole(config.memberRoleData, config.memberRole, "816846624160219170")
                }
                if (config.emojiID === "817059854124318770") { // Cplus // RoleID : 816846690362327040
                    await removeRole(config.memberRoleData, config.memberRole, "816846690362327040")
                }
                if (config.emojiID === "817059892179238931") { // Go // RoleID : 816847733968601119
                    await removeRole(config.memberRoleData, config.memberRole, "816847733968601119")
                }
                if (config.emojiID === "817060097318191104") { // TypeScript // RoleID : 816848006279331850
                    await removeRole(config.memberRoleData, config.memberRole, "816848006279331850")
                }
                if (config.emojiID === "817060062417649735") { // Rust // RoleID : 816848283933736961
                    await removeRole(config.memberRoleData, config.memberRole, "816848283933736961")
                }
                if (config.emojiID === "817059912806432818") { // HTMLCSS // RoleID : 816848574780276810
                    await removeRole(config.memberRoleData, config.memberRole, "816848574780276810")
                }
                if (config.emojiID === "817060049544544296") { // Ruby // RoleID : 816848995136569355
                    await removeRole(config.memberRoleData, config.memberRole, "816848995136569355")
                }
                if (config.emojiID === "817059970687696936") { // Kotlin // RoleID : 816849604371808296
                    await removeRole(config.memberRoleData, config.memberRole, "816849604371808296")
                }
                if (config.emojiID === "817060079576678460") { // Swift // RoleID : 816849638388006913
                    await removeRole(config.memberRoleData, config.memberRole, "816849638388006913")
                }
                if (config.emojiID === "817059986508087319") { // Lua // RoleID : 816849648429957153
                    await removeRole(config.memberRoleData, config.memberRole, "816849648429957153")
                }
            }
        }

    } Reaction()//.catch(err => console.log(`Failed to process message. Error :: ${err} :: Please fix the script carefully!`))
}