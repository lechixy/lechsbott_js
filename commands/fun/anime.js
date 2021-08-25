const Anime_Images = require('anime-images-api')
const API = new Anime_Images()
const akaneko = require("akaneko")

module.exports = {
    name: 'anime',
    cooldown: 3,
    aliases: ['animepic', 'ani'],
    description: 'pictures',
    async execute(client, message, args, cmd, Discord){
        const user = message.author;
        const channel = message.channel;
        let dangerousembed = new Discord.MessageEmbed()
        .setAuthor(`An important warning`)
        .setColor('#FF6E6E')
        .setDescription(`nsfw setting for this channel is turned off if you want use this command turn on the nsfw for this channel!`)
        .setImage('https://cdn.discordapp.com/attachments/843582665051471942/859929784829214720/nsfw.png')

        /*
         ! for normal
        */
        
        if(args[0] === 'hug'){
            let { image } = await API.sfw.hug()

            let animeembed = new Discord.MessageEmbed()
            .setImage(image)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'kiss'){
            let { image } = await API.sfw.kiss()

            let animeembed = new Discord.MessageEmbed()
            .setImage(image)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'slap'){
            let { image } = await API.sfw.slap()

            let animeembed = new Discord.MessageEmbed()
            .setImage(image)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'punch'){
            let { image } = await API.sfw.punch()

            let animeembed = new Discord.MessageEmbed()
            .setImage(image)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'wink'){
            let { image } = await API.sfw.wink()

            let animeembed = new Discord.MessageEmbed()
            .setImage(image)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'pat'){
            let { image } = await API.sfw.pat()

            let animeembed = new Discord.MessageEmbed()
            .setImage(image)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'kill'){
            let { image } = await API.sfw.kill()

            let animeembed = new Discord.MessageEmbed()
            .setImage(image)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'cuddle'){
            let { image } = await API.sfw.cuddle()

            let animeembed = new Discord.MessageEmbed()
            .setImage(image)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'neko'){
            let img = await akaneko.neko()

            let animeembed = new Discord.MessageEmbed()
            .setImage(img)
            message.channel.send({ embeds: [animeembed] })
        }
        /* 
        ! for nsfw
        */
        else if(args[0] === 'hentai'){
            if(!channel.nsfw === true){
                return message.channel.send({ embeds: [dangerousembed] })
            }

            let animeembed = new Discord.MessageEmbed()
            .setImage(await akaneko.nsfw.hentai())
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'hentai2'){
            if(!channel.nsfw === true){
                return message.channel.send({ embeds: [dangerousembed] })
            }
            let { image } = await API.nsfw.hentai()

            let animeembed = new Discord.MessageEmbed()
            .setImage(image)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'foxgirl'){
            const img = await akaneko.foxgirl()

            let animeembed = new Discord.MessageEmbed()
            .setImage(img)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'feet'){
            if(!channel.nsfw === true){
                return message.channel.send({ embeds: [dangerousembed] })
            }

            const img = await akaneko.nsfw.feet()

            let animeembed = new Discord.MessageEmbed()
            .setImage(img)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'ass'){
            if(!channel.nsfw === true){
                return message.channel.send({ embeds: [dangerousembed] })
            }

            const img = await akaneko.nsfw.ass()

            let animeembed = new Discord.MessageEmbed()
            .setImage(img)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'bdsm'){
            if(!channel.nsfw === true){
                return message.channel.send({ embeds: [dangerousembed] })
            }

            const img = await akaneko.nsfw.bdsm()

            let animeembed = new Discord.MessageEmbed()
            .setImage(img)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'blowjob'){
            if(!channel.nsfw === true){
                return message.channel.send({ embeds: [dangerousembed] })
            }

            const img = await akaneko.nsfw.blowjob()

            let animeembed = new Discord.MessageEmbed()
            .setImage(img)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'cum'){
            if(!channel.nsfw === true){
                return message.channel.send({ embeds: [dangerousembed] })
            }

            const img = await akaneko.nsfw.cum()

            let animeembed = new Discord.MessageEmbed()
            .setImage(img)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'doujin'){
            if(!channel.nsfw === true){
                return message.channel.send({ embeds: [dangerousembed] })
            }

            const img = await akaneko.nsfw.doujin()

            let animeembed = new Discord.MessageEmbed()
            .setImage(img)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'femdom'){
            if(!channel.nsfw === true){
                return message.channel.send({ embeds: [dangerousembed] })
            }

            const img = await akaneko.nsfw.femdom()

            let animeembed = new Discord.MessageEmbed()
            .setImage(img)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'gifs'){
            if(!channel.nsfw === true){
                return message.channel.send({ embeds: [dangerousembed] })
            }

            const img = await akaneko.nsfw.gifs()

            let animeembed = new Discord.MessageEmbed()
            .setImage(img)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'blowjob'){
            if(!channel.nsfw === true){
                return message.channel.send({ embeds: [dangerousembed] })
            }

            const img = await akaneko.nsfw.blowjob()

            let animeembed = new Discord.MessageEmbed()
            .setImage(img)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'glasses'){
            if(!channel.nsfw === true){
                return message.channel.send({ embeds: [dangerousembed] })
            }

            const img = await akaneko.nsfw.glasses()

            let animeembed = new Discord.MessageEmbed()
            .setImage(img)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'netorare'){
            if(!channel.nsfw === true){
                return message.channel.send({ embeds: [dangerousembed] })
            }

            const img = await akaneko.nsfw.netorare()

            let animeembed = new Discord.MessageEmbed()
            .setImage(img)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'maid'){
            if(!channel.nsfw === true){
                return message.channel.send({ embeds: [dangerousembed] })
            }

            const img = await akaneko.nsfw.maid()

            let animeembed = new Discord.MessageEmbed()
            .setImage(img)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'masturbation'){
            if(!channel.nsfw === true){
                return message.channel.send({ embeds: [dangerousembed] })
            }

            const img = await akaneko.nsfw.masturbation()

            let animeembed = new Discord.MessageEmbed()
            .setImage(img)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'orgy'){
            if(!channel.nsfw === true){
                return message.channel.send({ embeds: [dangerousembed] })
            }

            const img = await akaneko.nsfw.orgy()

            let animeembed = new Discord.MessageEmbed()
            .setImage(img)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'panties'){
            if(!channel.nsfw === true){
                return message.channel.send({ embeds: [dangerousembed] })
            }

            const img = await akaneko.nsfw.panties()

            let animeembed = new Discord.MessageEmbed()
            .setImage(img)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'pussy'){
            if(!channel.nsfw === true){
                return message.channel.send({ embeds: [dangerousembed] })
            }

            const img = await akaneko.nsfw.pussy()

            let animeembed = new Discord.MessageEmbed()
            .setImage(img)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'school'){
            if(!channel.nsfw === true){
                return message.channel.send({ embeds: [dangerousembed] })
            }

            const img = await akaneko.nsfw.school()

            let animeembed = new Discord.MessageEmbed()
            .setImage(img)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'succubus'){
            if(!channel.nsfw === true){
                return message.channel.send({ embeds: [dangerousembed] })
            }

            const img = await akaneko.nsfw.succubus()

            let animeembed = new Discord.MessageEmbed()
            .setImage(img)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'tentacles'){
            if(!channel.nsfw === true){
                return message.channel.send({ embeds: [dangerousembed] })
            }

            const img = await akaneko.nsfw.tentacles()

            let animeembed = new Discord.MessageEmbed()
            .setImage(img)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'thighs'){
            if(!channel.nsfw === true){
                return message.channel.send({ embeds: [dangerousembed] })
            }

            const img = await akaneko.nsfw.thighs()

            let animeembed = new Discord.MessageEmbed()
            .setImage(img)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'uglyBastard'){
            if(!channel.nsfw === true){
                return message.channel.send({ embeds: [dangerousembed] })
            }

            const img = await akaneko.nsfw.uglyBastard()

            let animeembed = new Discord.MessageEmbed()
            .setImage(img)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'uniform'){
            if(!channel.nsfw === true){
                return message.channel.send({ embeds: [dangerousembed] })
            }

            const img = await akaneko.nsfw.uniform()

            let animeembed = new Discord.MessageEmbed()
            .setImage(img)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'yuri'){
            if(!channel.nsfw === true){
                return message.channel.send({ embeds: [dangerousembed] })
            }

            const img = await akaneko.nsfw.yuri()

            let animeembed = new Discord.MessageEmbed()
            .setImage(img)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'zettaiRyouiki'){
            if(!channel.nsfw === true){
                return message.channel.send({ embeds: [dangerousembed] })
            }

            const img = await akaneko.nsfw.zettaiRyouiki()

            let animeembed = new Discord.MessageEmbed()
            .setImage(img)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'nsfwwallpaper'){
            if(!channel.nsfw === true){
                return message.channel.send({ embeds: [dangerousembed] })
            }

            const img = await akaneko.nsfw.mobileWallpapers()

            let animeembed = new Discord.MessageEmbed()
            .setImage(img)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'boobs'){
            if(!channel.nsfw === true){
                return message.channel.send({ embeds: [dangerousembed] })
            }
            let { image } = await API.nsfw.boobs()
    
            let animeembed = new Discord.MessageEmbed()
            .setImage(image)
            message.channel.send({ embeds: [animeembed] })
        }
        else if(args[0] === 'lesbian'){
            if(!channel.nsfw === true){
                return message.channel.send({ embeds: [dangerousembed] })
            }
            let { image } = await API.nsfw.lesbian()
    
            let animeembed = new Discord.MessageEmbed()
            .setImage(image)
            message.channel.send({ embeds: [animeembed] })
        }







        //For help
        else if (!args[0]){
            let helpembed = new Discord.MessageEmbed()
            .setAuthor(`lechsbott/anime`, user.displayAvatarURL({dynamic: true}))
            .setDescription(`different types of pictures of animes look down below`)
            .addField(`<a:zerotwo:854414118776864778> SFW`, `\`l!anime\` hug/kiss/punch/wink/pat/kill/cuddle/neko`, true)
            .addField(`💦 NSFW`, `\`l!anime\` hentai/hentai2/ass/bdsm/blowjob/cum/doujin/feet/femdom/foxgirl/gifs/glasses/netorare/maid/masturbation/orgy/panties/pussy/school/succubus/tentacles/thighs/uglyBastard/uniform/yuri/zettaiRyouiki/nsfwwallpaper/boobs/lesbian`, true)
            .addField(`\u200b`, `nsfw includes +18 stuffs please pay attention!`)
            message.channel.send({ embeds: [helpembed] })
        }
    }
}