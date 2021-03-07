const { messageFilter } = require('../modules/schema')
module.exports = async function roleDeleted(client, role) {
    async function Roles() {
        messageFilter.findOne({
            serverID: `${role.guild.id}_MessageFilter`,
        }, async(error, data) => {
            if (error) return console.log(`MongoDB Error :: [${error}] :: Error.`);
            if (!data) {
                return // await console.log(`❌ | This server don't have \`Message Filter\`. Run command \`${Prefix}filter create\` to create new one`)
            } else {
                try {
                    await data.allowRolestoText.shift(role.id)
                    await data.allowRolestoLink.shift(role.id)
                    await data.save().then(result => { return /*console.log(result)*/ }).catch(error => console.log(error))
                    console.log("Automatically delete Filter Messages - Filter Role")
                } catch (error) {
                    return
                }
            }
        })
    } Roles().catch(err => console.log(`Failed to process message. Error :: ${err} :: Please fix the script carefully!`))
}