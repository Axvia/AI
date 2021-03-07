const axios = require('axios')

// Sources: https://github.com/public-apis/public-api

module.exports = class Publapi {
    
    // ########## ANIMALS ############ //

    /**
     * Get random dog images from https://dog.ceo/api
     */
    static randomDog() {
        await axios.get('https://dog.ceo/api/breeds/image/random').then(resp => {
            const result = resp.data;
            return result.message;
        })
    }
    
    /**
     * Get random cat images from https://aws.random.cat/meow
     */
    static randomCat(){
        const url = String(`https://aws.random.cat/meow`).replace(/\\/g, "")
        await axios.get(url).then(resp => {
            const result = resp.data;
            return result.file;
        })
    }

    /**
     * Get random fox images from https://randomfox.ca/floof
     */
    static randomFox(){
        const url = String(`https://randomfox.ca/floof/`).replace(/\\/g, "")
        await axios.get(url).then(resp => {
            const result = resp.data;
            return result.image;
        })
    }

    /**
     * Get random shibe images from https://shibe.online/
     */
    static randomShibe(){
        const url = String(`http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true`).replace(/\\/g, "")
        await axios.get(url).then(resp => {
            const result = resp.data;
            return result.toString();
        })
    }

    // ########## Development ############ //

    /**
     * Find random activities to fight boredom from https://www.boredapi.com/
     */
    static boredApi(){
        const url = String(`https://www.boredapi.com/api/activity/`);
        await axios.get(url).then(resp => {
            const result = resp.data;
            let activity = result.activity;
            let type = result.type
            return {activity, type};
        })
    }



    
}