const { messageFilter, whitelist } = require('../modules/schema')
module.exports = async function channelDeleted(client, channel) {
    async function Channels() {

        let targetChannel = channel;
        messageFilter.findOne({ // -- Not delete but update
            serverID: `${channel.guild.id}_MessageFilter`,
        }, async(error, data) => {
            if (error) return console.log(`MongoDB Error :: [${error}] :: Error.`);
            if (!data) {
                return // await console.log(`❌ | This server don't have \`Message Filter\`. Run command \`${Prefix}filter create\` to create new one`)
            } else {
                if (data.filterText.includes(targetChannel)) {
                    await data.filterText.shift(targetChannel); // -- Delete channel id - Text
                    await data.save().then(result => { return /*console.log(result)*/ }).catch(error => console.log(error))
                    console.log("Automatically delete Filter Messages - Filter Text")    
                } else {
                    return; // Don't do anything
                }
                if (data.filterLink.includes(targetChannel)) {
                    await data.filterLink.shift(targetChannel); // -- Delete channel id - Link
                    await data.save().then(result => { return /*console.log(result)*/ }).catch(error => console.log(error))
                    console.log("Automatically delete Filter Messages - Filter Link")    
                } else {
                    return; // Don't do anything
                }
            }
        })
        whitelist.findOneAndDelete({ // -- Find and Delete
            serverID: channel.guild.id,
            ChannelID: channel.id,
        }, async(error, data) => {
            if (error) return console.log(`MongoDB Error :: [${error}] :: Error.`)
            if (!data) return; // console.log("Data not exists.") // -- Delete
            console.log("Whitelisted channels are automatically deleted from database")
        })
    } Channels().catch(err => console.log(`Failed to process message. Error :: ${err} :: Please fix the script carefully!`))
}