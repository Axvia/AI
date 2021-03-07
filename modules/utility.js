const okResp = ['yes', 'y'];
const noResp = ['no', 'n'];

module.exports = class Utility {
    /**
     * @param {Number} ms Time in miliseconds. 1000ms = 1 second
     */
	static delay(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    /**
     * @param {String} text 
     */
    static Console(text) {
        return console.log(text);
    }

    /**
     * @param {EventListener} message Message Listener
     * @param {String} id Channel ID
     */
    static async channelID(message, id) {
        if (message.channel.id === id) return true;
    }

    /**
     * @param {EventListener} message Message Listener
     * @param {String} name Channel Name
     */
    static async channelName(message, name) {
        if (message.channel.name === name) return true;
    }

    /**
     * @param {EventListener} message Message Listener
     */
    static async DMchannel(message) {
        if (message.channel.type === 'dm') return true;
    }

    /**
     * @param {EventListener} message Message Listener 
     * @param {String} name Role name
     */
    static async hasRole(message, rname) {
        if (message.member.roles.cache.find(role => role.name === rname)) return true;
    }
    
    /**
     * @param {EventListener} message Message Listener
     * @param {String} uid Author or User ID
     */
    static async hasID(message, uid) {
        if (message.author.id === uid) return true;
    }

    /**
     * @param {EventListener} message Message Listener
     * @param {String} topic Channel topic
     */
    static async withTopic(message, topic) {
        if (message.channel.topic === topic) return true;
    }

    /**
     * @param {Array} coll Array Collection
     * @param {String} uids Author or User ID
     */
    static async includesID(coll, uids) {
        if (Array.isArray(col)) {
            return coll.includes(uids);
        }
    }

    /**
     * @param {EventListener} message Message Listener
     * @param {String} name Command Name
     * @param {*} options Options prefix or suffix or both
     */
    static async Command(message, name, options = { prefix, suffix }) {
        if (message.content.startsWith(options.prefix + name)) return true;
        if (message.content.endsWith(options.suffix)) return true;
        if (message.content.startsWith(options.prefix + name) && message.content.endsWith(options.suffix)) return true;
        return false;
    }

    /**
     * To avoid error "emoji" not defined, just put { emoji: undefined }. See the example.
     * @param {EventListener} message Message Listener
     * @param {*} content Message Content
     * @param {Boolean} reply Reply yes or no
     * @param {*} option
     * @example
     * Send(message, "foo-bar", false, { emoji: undefined }) 
     */
    static async Send(message, content, reply, option = { emoji, code, timeout}) {
        const lifetime = parseInt(option.timeout)*1000;
        if (typeof reply === "boolean") {
            if (reply === false) {
                if (typeof option.code === "string") {
                    message.channel.send(content, { code: option.code }).then(async(messages) => {
                        if (lifetime > 0) {
                            messages.delete({timeout:lifetime});
                        }
                        if (Array.isArray(option.emoji)) {
                            option.emoji.forEach(async emoji => await messages.react(emoji).catch(()=>{}));
                        }
                        if (typeof option.emoji === "string" && !Array.isArray(option.emoji)) {
                            messages.react(option.emoji).catch(()=>{});
                        }
                    }).catch(()=>{});
                } else {
                    message.channel.send(content).then(async(messages) => {
                        if (lifetime > 0) {
                            messages.delete({timeout:lifetime});
                        }
                        if (Array.isArray(option.emoji)) {
                            option.emoji.forEach(async emoji => await messages.react(emoji).catch(()=>{}));
                        }
                        if (typeof option.emoji === "string" && !Array.isArray(option.emoji)) {
                            messages.react(option.emoji).catch(()=>{});
                        }
                    }).catch(()=>{});
                }
            } else if (reply === true) {
                if (typeof option.code === "string") {
                    message.reply(content, { code: option.code }).then(async(messages) => {
                        if (lifetime > 0) {
                            messages.delete({timeout:lifetime});
                        }
                        if (Array.isArray(option.emoji)) {
                            option.emoji.forEach(async emoji => await messages.react(emoji).catch(()=>{}));
                        }
                        if (typeof option.emoji === "string" && !Array.isArray(option.emoji)) {
                            messages.react(option.emoji).catch(()=>{});
                        }
                    }).catch(()=>{});
                } else {
                    message.reply(content).then(async(messages) => {
                        if (lifetime > 0) {
                            messages.delete({timeout:lifetime});
                        }
                        if (Array.isArray(option.emoji)) {
                            option.emoji.forEach(async emoji => await messages.react(emoji).catch(()=>{}));
                        }
                        if (typeof option.emoji === "string" && !Array.isArray(option.emoji)) {
                            messages.react(option.emoji).catch(()=>{});
                        }
                    }).catch(()=>{});
                }
            }
        }
    }

    /**
     * @param {Number} someDateInThePast Unix time
     * @example
     * timeAgo(Date.parse(user.joinedAt))
     * // or //
     * timeAgo(Date.parse('2019-10-10 13:10'))
     */
    static timeAgo(someDateInThePast) {
        var result = '';
        var difference = Date.now() - someDateInThePast;
    
        if (difference < 5 * 1000) {
            return 'Less than 5 minutes'; // just now
        } else if (difference < 90 * 1000) {
            return 'Lest than 1 hour'; // moments ago
        }
    
        //it has minutes
        if ((difference % 1000 * 3600) > 0) {
            if (Math.floor(difference / 1000 / 60 % 60) > 0) {
                let s = Math.floor(difference / 1000 / 60 % 60) == 1 ? '' : 's';
                result = `${Math.floor(difference / 1000 / 60 % 60)} minute${s} `;
            }
        }
    
        //it has hours
        if ((difference % 1000 * 3600 * 60) > 0) {
            if (Math.floor(difference / 1000 / 60 / 60 % 24) > 0) {
                let s = Math.floor(difference / 1000 / 60 / 60 % 24) == 1 ? '' : 's';
                result = `${Math.floor(difference / 1000 / 60 / 60 % 24)} hour${s}${result == '' ? '' : ','} ` + result;
            }
        }
    
        //it has days
        if ((difference % 1000 * 3600 * 60 * 24) > 0) {
            if (Math.floor(difference / 1000 / 60 / 60 / 24) > 0) {
                let s = Math.floor(difference / 1000 / 60 / 60 / 24) == 1 ? '' : 's';
                result = `${Math.floor(difference / 1000 / 60 / 60 / 24)} day${s}${result == '' ? '' : ','} ` + result;
            }
    
        }
        return result + ''; // ago
    }

    /**
     * @param {Array} array An array ["1","2","3"]
     */
	static shuffle(array) {
		const arr = array.slice(0);
		for (let i = arr.length - 1; i >= 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
		}
		return arr;
    }
    
    /**
     * @param {Array} arr An array ["1","2","3"]
     * @param {Parameters} conj Conjunction. "conj = 'and'"
     */
	static list(arr, conj = 'and') {
		const len = arr.length;
		if (len === 0) return '';
		if (len === 1) return arr[0];
		return `${arr.slice(0, -1).join(', ')}${len > 1 ? `${len > 2 ? ',' : ''} ${conj} ` : ''}${arr.slice(-1)}`;
    }
    
    /**
     * @param {String} text Text content
     * @param {Parameters} maxLen "maxLen = 2000"
     */
	static shorten(text, maxLen = 2000) {
		return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
	}

    /**
     * @param {Number} min A numeric number
     * @param {Number} max A numeric number
     */
	static randomRange(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

    /**
     * @param {Array} arr An array ["1","2","3"]
     * @param {Parameters} maxLen "maxLen = 10"
     */
	static trimArray(arr, maxLen = 10) {
		if (arr.length > maxLen) {
			const len = arr.length - maxLen;
			arr = arr.slice(0, maxLen);
			arr.push(`${len} more...`);
		}
		return arr;
	}

    /**
     * @param {Array} arr An array ["1","2","3"]
     * @param {String} value A value
     */
	static removeFromArray(arr, value) {
		const index = arr.indexOf(value);
		if (index > -1) return arr.splice(index, 1);
		return arr;
	}

    /**
     * @param {Array} arr An array ["1","2","3"]
     */
	static removeDuplicates(arr) {
		if (arr.length === 0 || arr.length === 1) return arr;
		const newArr = [];
		for (let i = 0; i < arr.length; i++) {
			if (newArr.includes(arr[i])) continue;
			newArr.push(arr[i]);
		}
		return newArr;
	}

    /**
     * @param {Array} a An array ["1","2","3"]
     * @param {Array} b An array ["1","2","3"]
     */
	static arrayEquals(a, b) {
		return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, i) => val === b[i]);
	}

    /**
     * @param {Array} arr An array ["1","2","3"]
     * @param {String} prop Property
     */
	static sortByName(arr, prop) {
		return arr.sort((a, b) => {
			if (prop) return a[prop].toLowerCase() > b[prop].toLowerCase() ? 1 : -1;
			return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
		});
	}

    /**
     * @param {String} text Text Content
     * @param {String} split String separator
     */
	static firstUpperCase(text, split = ' ') {
		return text.split(split).map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(' ');
	}

    /**
     * @param {Number} number Numeric number
     * @param {Parameters} minimumFractionDigits "minimumFractionDigits = 0"
     */
	static formatNumber(number, minimumFractionDigits = 0) {
		return Number.parseFloat(number).toLocaleString(undefined, {
			minimumFractionDigits,
			maximumFractionDigits: 2
		});
	}

    /**
     * @param {Number} number Numeric number
     */
	static formatNumberK(number) {
		return number > 999 ? `${(number / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 })}K` : number;
	}

    /**
     * @param {Date} time Date
     */
	static formatTime(time) {
		const min = Math.floor(time / 60);
		const sec = Math.floor(time - (min * 60));
		const ms = time - sec - (min * 60);
		return `${min}:${sec.toString().padStart(2, '0')}.${ms.toFixed(4).slice(2)}`;
	}

    /**
     * @param {String} channel Message.<Channel>
     * @param {*} user
     * @param {*} param2 
     * @example
     * const channel = await client.channels.cache.get(channelID)
     */
	static async verify(channel, user, { time = 30000, extraYes = [], extraNo = [] } = {}) {
		const filter = res => {
			const value = res.content.toLowerCase();
			return (user ? res.author.id === user.id : true)
				&& (okResp.includes(value) || noResp.includes(value) || extraYes.includes(value) || extraNo.includes(value));
		};
		const verify = await channel.awaitMessages(filter, {
			max: 1,
			time
		});
		if (!verify.size) return 0;
		const choice = verify.first().content.toLowerCase();
		if (okResp.includes(choice) || extraYes.includes(choice)) return true;
		if (noResp.includes(choice) || extraNo.includes(choice)) return false;
		return false;
	}

    /**
     * Create quick await reaction collector.
     * @param {EventListener} message Default listener
     * @param {*} input Message Content (Text / Embed) to wait for reaction
     * @param {*} array Collection ["❤","💙"]. emoji[0] = ❤ and emoji[1] = 💙
     * @param {*} timeout Wait duration in miliseconds (1000ms = 1 second)
     * @param {*} output1 Message Content [0] (Text / Embed). Response after reaction [0] added
     * @param {*} output2 Message Content [1] (Text / Embed). Response after reaction [1] added
     * @param {*} output3 Message Content [2] (Text / Embed). Response after reaction [2] added
     * @param {*} output4 Message Content [3] (Text / Embed). Response after reaction [3] added
     * @param {*} output5 Message Content [4] (Text / Embed). Response after reaction [4] added
     */
    static async reaction(message, input, array, timeout, output1, output2, output3, output4, output5) {
        let content = await message.channel.send(input)
        let listOfEmoji = array;

        const filter = (reaction, user) => {
            return (
                array.includes(reaction.emoji.name) && user.id === message.author.id
            );
        };
        
        array.forEach(async(emoji) => await content.react(emoji))

        const collector = await content.createReactionCollector(filter, {
            idle: timeout,
            errors: ["time"],
        });

        collector.on("collect", async function(reaction, user) {
            await reaction.users.remove(user.id);
                switch (reaction.emoji.name) {
                    case `${listOfEmoji[0]}`:
                        await message.channel.send(output1)
                        await collector.emit("end");
                    break;
                    case `${listOfEmoji[1]}`:
                        await message.channel.send(output2)
                        await collector.emit("end");
                    break;
                    case `${listOfEmoji[2]}`:
                        await message.channel.send(output3)
                        await collector.emit("end");
                    break;
                    case `${listOfEmoji[3]}`:
                        await message.channel.send(output4)
                        await collector.emit("end");
                    break;
                    case `${listOfEmoji[4]}`:
                        await message.channel.send(output5)
                        await collector.emit("end");
                    break;
                }
            }
        )
        collector.on("end", function(reaction, user) {
            content.delete().catch(()=>{})
            // content.reactions.removeAll().catch(()=>{})
        })
	}
	
	/**
     * Create quick await message collector. (FOR OPTIONS)
     * @param {EventListener} message Default listener
     * @param {*} input Message Content (Text / Embed) to wait for reaction
     * @param {*} array Collection ["yes","no"]. option[0] = yes and option[1] = no
     * @param {*} timeout Wait duration in miliseconds (1000ms = 1 second)
     * @param {*} output1 Message Content [0] (Text / Embed). An output after response [0] given
     * @param {*} output2 Message Content [1] (Text / Embed). An output after response [1] given
     * @param {*} output3 Message Content [2] (Text / Embed). An output after response [2] given
     * @param {*} output4 Message Content [3] (Text / Embed). An output after response [3] given
     * @param {*} output5 Message Content [4] (Text / Embed). An output after response [4] given
     */
    static async response(message, input, array, timeout, output1, output2, output3, output4, output5) {
        let content = await message.channel.send(input)

        let listOfOption = array;

        const filter = (m) => { 
            return (
                array.some(word => m.content.toLowerCase().startsWith(word)) && m.author.id === message.author.id
            );
        }

        const collector = await message.channel.createMessageCollector(filter, {
            //max: 1, // --- collector.emit("end");
            //time: timeout,
            idle: timeout,
            errors: ["time"],
        });

        collector.on("collect", async function(message) {
            let options = message.content.toLowerCase()
                if (options === listOfOption[0]) {
                    await message.channel.send(output1)
                    await collector.emit("end");
                } else if (options === listOfOption[1]) {
                    await message.channel.send(output2)
                    await collector.emit("end");
                } else if (options === listOfOption[2]) {
                    await message.channel.send(output3)
                    await collector.emit("end");
                } else if (options === listOfOption[3]) {
                    await message.channel.send(output4)
                    await collector.emit("end");
                } else if (options === listOfOption[4]) {
                    await message.channel.send(output5)
                    await collector.emit("end");
                }
            }
        )
        collector.on("end", function(message) {
            content.delete().catch(()=>{})
        })
    }
};