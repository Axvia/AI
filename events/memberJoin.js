const { InGuild } = require('../settings.json')
module.exports = async function memberJoin(client, member) {
    async function Member() {
        const config = {
            guildId: member.guild.id,
            guildName: member.guild.name,
            memberId: member.user.id,
            guildIcon: member.guild.iconURL(),
            userIcon: member.user.displayAvatarURL({dynamic: true, size: 512, format: "png"}),
            memberName: member.user.username,
            memberSince: member.joinedAt,
            userTag: member.user.tag,
            memberCreatedAt: member.user.createdAt,
            isBot: member.user.bot
        }
        if (config.guildId === InGuild.Hanazono) {
            let { Welcome } = require('../guilds/Hanazono/members/JoinLeave')
            await Welcome(client, "797063257218220083", config.userTag, config.userIcon, config.guildIcon, config.memberSince, config.guildName)
        }
        if (config.guildId === InGuild.DiscordKyz) {
            let { Welcome } = require('../guilds/Discord.kyz/members/JoinLeave')
            await Welcome(client, "800292845087883264", config.userTag, config.userIcon, config.guildIcon, config.memberCreatedAt, config.guildName, config.isBot, config.memberId)
        }

    } Member()//.catch(err => console.log(`Failed to process message. Error :: ${err} :: Please fix the script carefully!`))
}