module.exports = async function messageUpdate(client, message, oldMessage) {
    async function Messages() {
        if (message.author.bot) return; // Ignore other bots
        
        const oldContent = oldMessage && oldMessage.content || '*Unavailable due to bot restart*';
        const newContent = message.content;

        if (newContent.trim() === oldContent.trim()) return;
        // console.log(
        //     `[Message Updated] Author ${message.author.username}:\n`+
        //     `[Message Updated] Old: ${oldContent}\n`+
        //     `[Message Updated] New: ${newContent}`
        // );
    } Messages().catch(err => console.log(`Failed to process message. Error :: ${err} :: Please fix the script carefully!`))
}