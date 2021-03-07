const Discord = require('discord.js')
const { Prefix, CommandsHyperlink } = require('../../settings.json')

module.exports = {
    name: `unmute`,
    desc: `Unmute user`,
    usage: `\`${Prefix}unmute <id|username>\``,
    category: `Moderation`,
    accessibly: `Moderator`,
    aliases: ["unmute"],
    cooldown: 5,
    details: `[unmute](${CommandsHyperlink} 'Unmute user')`,
    permissions: [ "Manage Roles" ],
    status: "Active",
    launch: async(client, message, args) => {
        try {
            if (!message.member.roles.cache.find(role => role.name === "Moderator")) return message.channel.send("Moderator role required!");
            if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(`Missing Permission to \`Manage Roles\`.`)
            if (!args[0]) return message.channel.send(`Please provide user \`id|username\` to mute!`)
            const userCache = (message.guild.members.cache.find(member => member.user.tag === args[0]) || message.guild.members.cache.find(member => member.user.id === args[0]) || message.guild.members.cache.find(member => member.user.username === args[0]) || message.guild.members.cache.find(member => member.nickname === args[0]))
            const guidMember = message.guild.member(userCache);
            const MuteRole = await message.guild.roles.cache.find(role => role.name === 'Muted');
            if (!MuteRole) return message.channel.send(`Unable to find \`Muted\` role!`)
            if (guidMember.id === message.author.id) return console.log(`Unable to unmute ${message.author.username}`);
            if (guidMember.id === client.user.id) return console.log(`Unable to unmute ${client.user.username}`);
            const MuteMember = await guidMember.roles.cache.find(role => {
                if (role.name === 'Muted') {
                    return guidMember.roles.remove(MuteRole).then(message.channel.send(`**${guidMember.user.tag}** has been unmuted by **${message.author.username}**`)).catch(e=>message.channel.send(`Error encountered :: **${e}**`).catch(()=>{}))
                }
            })
            if (!MuteMember) return message.channel.send(`**${guidMember.user.tag}** not muted.`);
     
        } catch (e) {
            return console.log(`Error. Unable to execute the Command. // Error: ${e} //`)
        }
    }
}
