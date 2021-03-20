const mongoose = require("mongoose");
const { MongodbSRV } = require('../settings.json')
const { redBright, yellowBright } = require('chalk')

async function MongoDB() {
    console.log(yellowBright('Connecting to MongoDB ...'));
    mongoose.connect(MongodbSRV, { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => console.log(`Info - Error: Failed to connect MongoDB [Error :: ${err}]`));
    mongoose.connection.on('error', function (err) { console.log('Info: Failed to connect to MongoDB. [Disconnected : True]'); mongoose.disconnect().catch(()=>{}); });
    mongoose.connection.once('open', function (d) { console.log("\x1b[32mInfo:\x1b[0m connected to \x1b[31m" + mongoose.connection.host + " \x1b[0m"); })
} MongoDB().catch(err => {console.log(`"MongoDB - Error: ${redBright(err)}`)})



const blacklist = new mongoose.Schema({
    serverID: String,
    ChannelID: String
})

const whitelist = new mongoose.Schema({
    serverID: String,
    ChannelID: String
})

const messageFilter = new mongoose.Schema({
    serverID: String,
    callbackMessageFText: String,
    callbackMessageFLink: String,
    allowRolestoText: Array,
    allowRolestoLink: Array,
    filterText: Array,
    filterLink: Array,
})

const swearWords = new mongoose.Schema({
    serverID: String,
    callbackMessage: String,
    blockedWords: Array
})

module.exports = 
{ 
    messageFilter:mongoose.model("messageFilter", messageFilter),
    blacklist:mongoose.model("blacklist", blacklist),
    whitelist:mongoose.model("whitelist", whitelist),
    swearWords:mongoose.model("swearWords", swearWords)
}
