const { MessageEmbed } = require('discord.js')
const { timeAgo } = require('../../../modules/utility')

const welcome = ['./guilds/Hanazono/images/Discord-Welcome-Message.png'];
const welcomeimg = 'attachment://Discord-Welcome-Message.png';
const farewel = ['./guilds/Hanazono/images/Discord-Farewell-Message.png'];
const farewelimg = 'attachment://Discord-Farewell-Message.png';

const date = new Date(Date.now()).toDateString();
const time = new Date(Date.now()).toLocaleTimeString();

module.exports = class JoinLeave {
    static async Welcome(client, channelID, userTag, userIcon, guildIcon, memberSince, guildName) {
        const channel = await client.channels.cache.get(channelID);
        if (!channel) return message.channel.send("I cannot find channel to send welcome message").catch(()=>{})
        const embed = new MessageEmbed()
        .setColor("#E0B0FF").attachFiles(welcome).setImage(welcomeimg)
        .setAuthor(`Welcome to ${guildName}`,`${guildIcon}`)
        .setThumbnail(`${userIcon}`)
        .setDescription(
            `Member: **${userTag}**.\n`+
            `Today: **${date}** at **${time}**.\n`+
            `> __Just now__ in **${guildName}**.`
        )
        if (embed) {
            return await channel.send(embed).catch((err)=>console.error(err))
        }
    };

    static async Farewell(client, channelID, userTag, userIcon, guildIcon, memberSince, guildName) {
        const channel = await client.channels.cache.get(channelID);
        if (!channel) return message.channel.send("I cannot find channel to send farewell message").catch(()=>{})
        const embed = new MessageEmbed()
        .setColor("#5a75a2").attachFiles(farewel).setImage(farewelimg)
        .setAuthor(`Farewell from ${guildName}`,`${guildIcon}`)
        .setThumbnail(`${userIcon}`)
        .setDescription(
            `Member: **${userTag}**.\n`+
            `Today: **${date}** at **${time}**.\n`+
            `> __${timeAgo(Date.parse(memberSince))}__ total time spent in **${guildName}**.`
        )
        if (embed) {
            return await channel.send(embed).catch((err)=>console.error(err))
        }
    };

}