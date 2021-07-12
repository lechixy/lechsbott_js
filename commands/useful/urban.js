const axios = require('axios');
const { PREFIX } = require("../util/lechsbottUtil")

module.exports = {
    name:'urban',
    aliases:['dictionary'],
    description:'A wonderful dictionary for discord!',
    async execute(client, message, args, cmd, Discord) {
        let query = args.join(' ');
        if(!query){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Please specify a word to search for!`, message.author.displayAvatarURL({dynamic: true}))
            .addField(`Usage`, `${PREFIX}urban`, true)
            .addField(`Aliases`, `urban/dictionary`, true)
            return message.channel.send(embed);
        }

        query = encodeURIComponent(query);

        const {
            data: { list },
        } = await axios.get(
            `https://api.urbandictionary.com/v0/define?term=${query}`
        );

        const [ answer ] = list;

        const embed = new Discord.MessageEmbed()
        .setTitle(answer.word)
        .setURL(answer.permalink)
        .addField(`Definition`, trim(answer.definition), true)
        .addField(`Example`, trim(answer.example), true)
        .addField(`Ratings`, `<a:thumbs_up:863778834506711040> ${answer.thumbs_up}  |  ${answer.thumbs_down} <a:thumbs_down:863778834255970325>`, true)
        message.channel.send(embed);
  }
}

function trim(input){
    return input.length > 1024 ? `${input.slice(0, 1020)} ...` : input;
}