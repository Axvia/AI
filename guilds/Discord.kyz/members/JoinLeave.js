const { MessageEmbed } = require('discord.js')
const { timeAgo } = require('../../../modules/utility')

const date = new Date(Date.now()).toDateString();
const time = new Date(Date.now()).toLocaleTimeString();

module.exports = class JoinLeave {
    static async Welcome(client, channelID, userTag, userIcon, guildIcon, memberCreatedAt, guildName, isBot, memberId) {
        const channel = await client.channels.cache.get(channelID);
        if (!channel) return message.channel.send("I cannot find channel to send welcome message").catch(()=>{})
        const embed = new MessageEmbed()
        .setColor("#fff936")
        .setTitle("Who Joined?")
        .setThumbnail(`${userIcon}`)
        .setAuthor(`${guildName}`, `${guildIcon}`)
        .setDescription
        (
            `❯ Bot?: **${isBot ? 'Yes' : 'No'}**\n`+
            `❯ Tag: **${userTag}**\n`+
            `❯ Mention: **<@!${memberId}>**\n`+
            `❯ ID: **${memberId}**\n`+
            `❯ Today: **${date}** at **${time}**\n`+
            `❯ Registered: __${timeAgo(Date.parse(memberCreatedAt))} ago__ **as discord user**`
        )
        if (embed) {
            return await channel.send(embed).catch((err)=>console.error(err))
        }
    }
    static async Farewell(client, channelID, userTag, userIcon, guildIcon, memberSince, guildName, isBot, memberId) {
        const channel = await client.channels.cache.get(channelID);
        if (!channel) return message.channel.send("I cannot find channel to send welcome message").catch(()=>{})
        const embed = new MessageEmbed()
        .setColor("#36e1ff")
        .setTitle("Who Leaves?")
        .setThumbnail(`${userIcon}`)
        .setAuthor(`${guildName}`, `${guildIcon}`)
        .setDescription
        (
            `❯ Bot?: **${isBot ? 'Yes' : 'No'}**\n`+
            `❯ Tag: **${userTag}**\n`+
            `❯ Mention: **<@!${memberId}>**\n`+
            `❯ ID: **${memberId}**\n`+
            `❯ Today: **${date}** at **${time}**\n`+
            `❯ __${timeAgo(Date.parse(memberSince))}__ total time spent in **${guildName}**`
        )
        if (embed) {
            return await channel.send(embed).catch((err)=>console.error(err))
        }
    }
}