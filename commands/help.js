module.exports = {
    name: "help",
    cooldown: 5,
    description: "welcome to the lab",
    async execute(client, message, args, cmd, Discord) {

        let botpp = client.user.displayAvatarURL()

        let helpembed = new Discord.MessageEmbed()
        .setAuthor('lechsbott/help/menu', `${botpp}`)
        .setDescription('An embed for help that complicated commands!')
        .addField('\u200B', '\u200B')
        .addField('🛠 Admin', '\`react 🛠\`', true)
        .addField('✨ Fun', '\`react ✨\`', true)
        .addField('🎶 Music', '\`react 🎶\`', true)
        .addField('📑 Information', '\`react 📑\`', true)
        .addField('🗂 Counters', '\`react 🗂\`', true)
        .addField('🎊 Other', '\`react 🎊\`', true)
        .setFooter('for back page unreact emoji • for delete react 🗑')
        .setTimestamp()
        const m = await message.channel.send(helpembed);
        m.react('🛠')
        m.react('✨')
        m.react('🎶')
        m.react('📑')
        m.react('🗂')
        m.react('🎊')
        m.react('🗑')


            client.on('messageReactionAdd', async (reaction, user) => {
                let channel = message.channel.id
                
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
                if (!reaction.message.guild) return;

                if (reaction.message.channel.id == channel) {
                    if (reaction.emoji.name === '🛠') {
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
                        m.edit(adminembed)
                    }
                    if (reaction.emoji.name === '✨') {
                        let botpp = client.user.displayAvatarURL()

                        let musicembed = new Discord.MessageEmbed()
                        .setAuthor('lechsbott/help/fun', `${botpp}`)
                        .setDescription('Learn more details for fun command!')
                        .addField('\u200B', '\u200B')
                        .addField('Get an advice', '\`l!advice\`', true)
                        .addField('Search a image on Google', '\`l!image <wanted image>\`', true)
                        .addField('Get an meme on Reddit', '\`l!meme\`', true)
                        .addField('Play rock, paper, scissors on Discord!', '\`l!rps/ l!tkm\`', true)
                        .setFooter('for back page unreact emoji')
                        .setTimestamp()
                        m.edit(musicembed)
                    }
                    if (reaction.emoji.name === '🎶') {
            
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
                        m.edit(musicembed)
                        
                    }
                    if (reaction.emoji.name === '📑') {
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
                        .addField('See an user currently Spotify info\'s', '\`l!spotify/spo <tag user/ leave blank>\`', true)
                        .addField('See an user currently Game info\'s', '\`l!game <tag user/leave blank>\`', true)
                        .addField('See an user currently Twitch info\'s', '\`l!twitch <tag user/leave blank>\`', true)
                        .addField('See an user currently Youtube info\'s', '\`l!youtube/yt <tag user/leave blank>\`', true)
                        .addField('See an user currently Spotify Song Lyrics!', '\`l!listeninglyrics/spotifylyrics/lyrcs <tag user/leave blank>\`', true)
                        .setTimestamp()
                        m.edit(infoembed)
                    }
                    if (reaction.emoji.name === '🗂') {
                        
                    }
                    if (reaction.emoji.name === '🎊') {
                    }
                    if (reaction.emoji.name === '🗑') {
                        m.delete()
                    }
                } else {
                    return;
                }

            });
    
            client.on('messageReactionRemove', async (reaction, user) => {
                let channel = message.channel.id

                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
                if (!reaction.message.guild) return;
     
     
                if (reaction.message.channel.id == channel) {
                    if (reaction.emoji.name === '🛠'){
                        let botpp = client.user.displayAvatarURL()

                        let helpembed = new Discord.MessageEmbed()
                        .setAuthor('lechsbott help menu', `${botpp}`)
                        .setDescription('An embed for help that complicated commands!')
                        .addField('\u200B', '\u200B')
                        .addField('🛠 Admin', '\`react 🛠\`', true)
                        .addField('✨ Fun', '\`react ✨\`', true)
                        .addField('🎶 Music', '\`react 🎶\`', true)
                        .addField('📑 Information', '\`react 📑\`', true)
                        .addField('🗂 Counters', '\`react 🗂\`', true)
                        .addField('🎊 Other', '\`react 🎊\`', true)
                        .setTimestamp()
                        m.edit(helpembed)
                    }
                    if (reaction.emoji.name === '✨') {
                        let botpp = client.user.displayAvatarURL()

                        let helpembed = new Discord.MessageEmbed()
                        .setAuthor('lechsbott help menu', `${botpp}`)
                        .setDescription('An embed for help that complicated commands!')
                        .addField('\u200B', '\u200B')
                        .addField('🛠 Admin', '\`react 🛠\`', true)
                        .addField('✨ Fun', '\`react ✨\`', true)
                        .addField('🎶 Music', '\`react 🎶\`', true)
                        .addField('📑 Information', '\`react 📑\`', true)
                        .addField('🗂 Counters', '\`react 🗂\`', true)
                        .addField('🎊 Other', '\`react 🎊\`', true)
                        .setTimestamp()
                        m.edit(helpembed)
                    }
                    if (reaction.emoji.name === '🎶') {
                        let botpp = client.user.displayAvatarURL()

                        let helpembed = new Discord.MessageEmbed()
                        .setAuthor('lechsbott help menu', `${botpp}`)
                        .setDescription('An embed for help that complicated commands!')
                        .addField('\u200B', '\u200B')
                        .addField('🛠 Admin', '\`react 🛠\`', true)
                        .addField('✨ Fun', '\`react ✨\`', true)
                        .addField('🎶 Music', '\`react 🎶\`', true)
                        .addField('📑 Information', '\`react 📑\`', true)
                        .addField('🗂 Counters', '\`react 🗂\`', true)
                        .addField('🎊 Other', '\`react 🎊\`', true)
                        .setTimestamp()
                        m.edit(helpembed)
                    }
                    if (reaction.emoji.name === '📑') {
                        let botpp = client.user.displayAvatarURL()

                        let helpembed = new Discord.MessageEmbed()
                        .setAuthor('lechsbott help menu', `${botpp}`)
                        .setDescription('An embed for help that complicated commands!')
                        .addField('\u200B', '\u200B')
                        .addField('🛠 Admin', '\`react 🛠\`', true)
                        .addField('✨ Fun', '\`react ✨\`', true)
                        .addField('🎶 Music', '\`react 🎶\`', true)
                        .addField('📑 Information', '\`react 📑\`', true)
                        .addField('🗂 Counters', '\`react 🗂\`', true)
                        .addField('🎊 Other', '\`react 🎊\`', true)
                        .setTimestamp()
                        m.edit(helpembed)
                    }
                    if (reaction.emoji.name === '🗂') {
                        let botpp = client.user.displayAvatarURL()

                        let helpembed = new Discord.MessageEmbed()
                        .setAuthor('lechsbott help menu', `${botpp}`)
                        .setDescription('An embed for help that complicated commands!')
                        .addField('\u200B', '\u200B')
                        .addField('🛠 Admin', '\`react 🛠\`', true)
                        .addField('✨ Fun', '\`react ✨\`', true)
                        .addField('🎶 Music', '\`react 🎶\`', true)
                        .addField('📑 Information', '\`react 📑\`', true)
                        .addField('🗂 Counters', '\`react 🗂\`', true)
                        .addField('🎊 Other', '\`react 🎊\`', true)
                        .setTimestamp()
                        m.edit(helpembed)
                    }
                    if (reaction.emoji.name === '🎊') {
                        let botpp = client.user.displayAvatarURL()

                        let helpembed = new Discord.MessageEmbed()
                        .setAuthor('lechsbott help menu', `${botpp}`)
                        .setDescription('An embed for help that complicated commands!')
                        .addField('\u200B', '\u200B')
                        .addField('🛠 Admin', '\`react 🛠\`', true)
                        .addField('✨ Fun', '\`react ✨\`', true)
                        .addField('🎶 Music', '\`react 🎶\`', true)
                        .addField('📑 Information', '\`react 📑\`', true)
                        .addField('🗂 Counters', '\`react 🗂\`', true)
                        .addField('🎊 Other', '\`react 🎊\`', true)
                        .setTimestamp()
                        m.edit(helpembed)
                    }
                } else {
                    return;
                }
            });
        }   
    }