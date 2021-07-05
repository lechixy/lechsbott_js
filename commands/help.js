module.exports = {
    name: "help",
    cooldown: 5,
    description: "welcome to the lab",
    async execute(client, message, args, cmd, Discord) {

        if(!args[0]){
            let botpp = client.user.displayAvatarURL()

            let helpembed = new Discord.MessageEmbed()
            .setAuthor('lechsbott/help/menu', `${botpp}`)
            .setDescription('An embed for help that complicated commands!')
            .addField('\u200B', '\u200B')
            .addField('🛠 Admin', '\`l!help admin\`', true)
            .addField('✨ Fun', '\`l!help fun\`', true)
            .addField('🎶 Music', '\`l!help music\`', true)
            .addField('📑 Information', '\`l!help information\`', true)
            .addField('🗂 Counters', '\`l!help counters\`', true)
            .addField('🎊 Other', '\`l!help other\`', true)
            .setTimestamp()
            message.channel.send(helpembed).then(
                message.delete({ timeout: 30000 })
            )
        }
        if(args[0] === 'admin'){
            let botpp = client.user.displayAvatarURL()

            let adminembed = new Discord.MessageEmbed()
            .setAuthor('lechsbott/help/admin', `${botpp}`)
            .setDescription('Learn more details about admin commands!')
            .addField('\u200B', '\u200B')
            .addField('Ban a member', '\`l!ban <person>\`', true)
            .addField('Mute a member', '\`l!mute <person> <optional: reason>\`', true)
            .addField('Unmute a member', '\`l!unmute <person>\`', true)
            .addField('Kick a member', '\`l!kick <person>\`', true)
            .addField('Clear wanted messages', '\`l!clear <number from 1 to 100>\`', true)
            .setFooter('for back page unreact emoji')
            .setTimestamp()
            message.channel.send(adminembed)
        }
        if(args[0] === 'fun'){
            let botpp = client.user.displayAvatarURL()

            let funembed = new Discord.MessageEmbed()
            .setAuthor('lechsbott/help/fun', `${botpp}`)
            .setDescription('Learn more details for fun command!')
            .addField('\u200B', '\u200B')
            .addField('Get an advice', '\`l!advice\`', true)
            .addField('Search a image on Google', '\`l!image <wanted image>\`', true)
            .addField('Get an meme on Reddit', '\`l!meme\`', true)
            .addField('Play rock, paper, scissors on Discord!', '\`l!rps/ l!tkm\`', true)
            .setFooter('for back page unreact emoji')
            .setTimestamp()
            message.channel.send(funembed)
        }
        if(args[0] === 'music'){
            let botpp = client.user.displayAvatarURL()

            let musicembed = new Discord.MessageEmbed()
            .setAuthor('lechsbott/help/music', `${botpp}`)
            .setDescription('Learn more details for music command!')
            .addField('\u200B', '\u200B')
            .addField('Play a song', '\`l!p/ l!play\`', true)
            .addField('Search a song', '\`l!search\`', true)
            .addField('Skip to another song', '\`l!skip\`', true)
            .addField('Lyrics for current song', '\`l!lyrics\`', true)
            .addField('Search lyrics of a song', '\`l!lyricsof\`', true)
            .addField('Pause to current song', '\`l!pause\`', true)
            .addField('Resume to current song', '\`l!resume\`', true)
            .addField('Shows current playing song', '\`l!np/ l!nowplaying\`', true)
            .addField('Creates an embed for current server queue', '\`l!queue\`', true)
            .addField('Set volume for player', '\`l!volume\`', true)
            .addField('Disconnect for channel', '\`l!disconnect/ l!dc\`', true)
            .addField('Seek to current song', '\`l!seek <second to wanted seek>\`', true)
            .setFooter('for back page unreact emoji')
            .setTimestamp()
            message.channel.send(musicembed)
        }
        if(args[0] === 'information'){
            let botpp = client.user.displayAvatarURL()

            let infoembed = new Discord.MessageEmbed()
            .setAuthor('lechsbott/help/information', `${botpp}`)
            .setDescription('Learn more details about informations command!')
            .addField('\u200B', '\u200B')
            .addField('See tagged person/ your avatar', '\`l!avatar <a person wanted>\`', true)
            .addField('See world covid status/ any country', '\`l!covid <all/country>\`', true)
            .addField('Creates an embed for date', '\`l!date\`', true)
            .addField('See emoji count on your server', '\`l!emojis\`', true)
            .addField('See lechsbott currently ping', '\`l!ping\`', true)
            .addField('Creates an embed for server infos', '\`l!serverinfo\`', true)
            .addField('See weather of a province', '\`l!weather <province name>\`', true)
            .addField('\u200B', '\u200B')
            .addField('About social statuses', 'About **social statuses** are works with **PreMid** only Spotify works without PreMid...')
            .addField('See an user currently Spotify info\'s', '\`l!spotify/spo <tag user/ leave blank>\`', true)
            .addField('See an user currently Game info\'s', '\`l!game <tag user/leave blank>\`', true)
            .addField('See an user currently Twitch info\'s', '\`l!twitch <tag user/leave blank>\`', true)
            .addField('See an user currently Youtube info\'s', '\`l!youtube/yt <tag user/leave blank>\`', true)
            .addField('See an user currently Netflix info\'s', '\`l!netflix/netf <tag user/leave blank>\`', true)
            .addField('See an user currently Spotify Song Lyrics!', '\`l!listeninglyrics/spotifylyrics/lyrcs <tag user/leave blank>\`', true)
            .setTimestamp()
            message.channel.send(infoembed)
        }
        if(args[0] === 'counters'){
            return;
        }
        if(args[0] === 'others'){
            return;
        } 
    }
}