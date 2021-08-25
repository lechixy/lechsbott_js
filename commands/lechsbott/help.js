const { PREFIX } = require("../util/lechsbottUtil")

module.exports = {
    name: "help",
    cooldown: 5,
    description: "welcome to the lab",
    async execute(client, message, args, cmd, Discord) {

        if(!args[0]){
            let botpp = client.user.displayAvatarURL()

            let helpembed = new Discord.MessageEmbed()
            .setAuthor(`lechsbott/help/menu`, `${botpp}`)
            .setDescription(`An embed for help that complicated commands!`)
            .addField(`\u200B`, `\u200B`)
            .addField(`🛠 Admin`, `\`${PREFIX}help admin\``, true)
            .addField(`✨ Fun`, `\`${PREFIX}help fun\``, true)
            .addField(`🎶 Music`, `\`${PREFIX}help music\``, true)
            .addField(`📑 Information`, `\`${PREFIX}help information\``, true)
            .addField(`🗂 Counters`, `\`${PREFIX}help counters\``, true)
            .addField(`<a:mortisheart:863811110033162270> BrawlStats`, `\`${PREFIX}help bstats/brawlstats\``, true)
            .addField(`🎊 Other`, `\`${PREFIX}help other\``, true)
            .setTimestamp()
            message.channel.send({ embeds: [helpembed] })
        }
        if(args[0] === `admin`){
            let botpp = client.user.displayAvatarURL()

            let adminembed = new Discord.MessageEmbed()
            .setAuthor(`lechsbott/help/admin`, `${botpp}`)
            .setDescription(`Learn more details about admin commands!`)
            .addField(`\u200B`, `\u200B`)
            .addField(`Ban a member`, `\`${PREFIX}ban <person>\``, true)
            .addField(`Mute a member`, `\`${PREFIX}mute <person> <optional: reason>\``, true)
            .addField(`Unmute a member`, `\`${PREFIX}unmute <person>\``, true)
            .addField(`Kick a member`, `\`${PREFIX}kick <person>\``, true)
            .addField(`Clear wanted messages`, `\`${PREFIX}clear <number from 1 to 100>\``, true)
            .setFooter(`for back page unreact emoji`)
            .setTimestamp()
            message.channel.send({ embeds: [adminembed] })
        }
        if(args[0] === `fun`){
            let botpp = client.user.displayAvatarURL()

            let funembed = new Discord.MessageEmbed()
            .setAuthor(`lechsbott/help/fun`, `${botpp}`)
            .setDescription(`Learn more details for fun command!`)
            .addField(`\u200B`, `\u200B`)
            .addField(`Get an advice`, `\`${PREFIX}advice\``, true)
            .addField(`Search a image on Google`, `\`${PREFIX}image <wanted image>\``, true)
            .addField(`Get an meme on Reddit`, `\`${PREFIX}meme\``, true)
            .addField(`Play rock, paper, scissors on Discord!`, `\`${PREFIX}rps/ ${PREFIX}tkm\``, true)
            .setFooter(`for back page unreact emoji`)
            .setTimestamp()
            message.channel.send({ embeds: [funembed] })
        }
        if(args[0] === `music`){
            let botpp = client.user.displayAvatarURL()

            let musicembed = new Discord.MessageEmbed()
            .setAuthor(`lechsbott/help/music`, `${botpp}`)
            .setDescription(`Learn more details for music command!`)
            .addField(`\u200B`, `\u200B`)
            .addField(`Play a song`, `\`${PREFIX}p/ ${PREFIX}play\``, true)
            .addField(`Search a song`, `\`${PREFIX}search\``, true)
            .addField(`Skip to another song`, `\`${PREFIX}skip\``, true)
            .addField(`Lyrics for current song`, `\`${PREFIX}lyrics\``, true)
            .addField(`Search lyrics of a song`, `\`${PREFIX}lyricsof\``, true)
            .addField(`Pause to current song`, `\`${PREFIX}pause\``, true)
            .addField(`Resume to current song`, `\`${PREFIX}resume\``, true)
            .addField(`Shows current playing song`, `\`${PREFIX}np/ ${PREFIX}nowplaying\``, true)
            .addField(`Creates an embed for current server queue`, `\`${PREFIX}queue\``, true)
            .addField(`Set volume for player`, `\`${PREFIX}volume\``, true)
            .addField(`Disconnect for channel`, `\`${PREFIX}disconnect/ ${PREFIX}dc\``, true)
            .addField(`Seek to current song`, `\`${PREFIX}seek <second to wanted seek>\``, true)
            .setTimestamp()
            message.channel.send({ embeds: [musicembed] })
        }
        if(args[0] === `information`){
            let botpp = client.user.displayAvatarURL()

            let infoembed = new Discord.MessageEmbed()
            .setAuthor(`lechsbott/help/information`, `${botpp}`)
            .setDescription(`Learn more details about informations command!`)
            .addField(`\u200B`, `\u200B`)
            .addField(`See tagged person/ your avatar`, `\`${PREFIX}avatar <a person wanted>\``, true)
            .addField(`See world covid status/ any country`, `\`${PREFIX}covid <all/country>\``, true)
            .addField(`Creates an embed for date`, `\`${PREFIX}date\``, true)
            .addField(`See emoji count on your server`, `\`${PREFIX}emojis\``, true)
            .addField(`See lechsbott currently ping`, `\`${PREFIX}ping\``, true)
            .addField(`Creates an embed for server infos`, `\`${PREFIX}serverinfo\``, true)
            .addField(`See weather of a province`, `\`${PREFIX}weather <province name>\``, true)
            .addField(`\u200B`, `\u200B`)
            .addField(`About social statuses`, `About **social statuses** are works with **PreMid** only Spotify works without PreMid...`)
            .addField(`See an user currently Spotify info\`s`, `\`${PREFIX}spotify/spo <tag user/ leave blank>\``, true)
            .addField(`See an user currently Game info\`s`, `\`${PREFIX}game <tag user/leave blank>\``, true)
            .addField(`See an user currently Twitch info\`s`, `\`${PREFIX}twitch <tag user/leave blank>\``, true)
            .addField(`See an user currently Youtube info\`s`, `\`${PREFIX}youtube/yt <tag user/leave blank>\``, true)
            .addField(`See an user currently Netflix info\`s`, `\`${PREFIX}netflix/netf <tag user/leave blank>\``, true)
            .addField(`See an user currently Spotify Song Lyrics!`, `\`${PREFIX}listeninglyrics/spotifylyrics/lyrcs <tag user/leave blank>\``, true)
            .setTimestamp()
            message.channel.send({ embeds: [infoembed] })
        }
        if(args[0] === `counters`){
            return;
        }
        if(args[0] === `others`){
            return;
        }
        if(args[0] === `bstars` || args[0] === `brawlstars`){
            let botpp = client.user.displayAvatarURL({dynamic: true})

            const embed = new Discord.MessageEmbed()
            .setAuthor(`lechsbott/help/${args[0]}`, botpp)
            .setImage('https://cdn.discordapp.com/attachments/843582665051471942/863818072213553212/Screenshot_20210711-192235_Brawl_Stars.jpg')
            .setDescription(`Learn more details for ${args[0]} command!`)
            .addField(`\u200B`, `\u200B`)
            .addField(`See a brawl stars profile!`, `${PREFIX}brawlprofile <example: 2ULRVCR0V>`, true)
            message.channel.send({ embeds: [embed] });
        } 
    }
}