const { PREFIX } = require('../util/lechsbottUtil')


module.exports = {
    name:'serverinfo',
    aliases:['server-info', 'server', 'guild'],
    description:'',
    async execute(client, message, args, cmd, Discord) {
        
        const guild = message.guild

        let region = {
			"us-central": "America :flag_us:",
			"us-east": "East America :flag_us:",
			"us-south": "South America :flag_us:",
			"us-west": "West America :flag_us:",
			"eu-west": "West Europe :flag_eu:",
			"eu-central": "Europe :flag_eu:",
			"singapore": "Singapore :flag_sg:",
			"london": "London :flag_gb:",
			"japan": "Japan :flag_jp:",
			"russia": "Russia :flag_ru:",
			"hongkong": "Hong Kong :flag_hk:",
			"brazil": "Brazil :flag_br:",
			"singapore": "Singapore :flag_sg:",
			"sydney": "Sidney :flag_au:",
			"southafrica": "South Africa :flag_za:",
    		"amsterdam": "Netherlands :flag_nl:",
			"europe": "Europe :flag_eu:"
	    }

        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " day" : " day") + " ago";
        };

        let serverSize = message.guild.memberCount;
        let botCount = message.guild.members.cache.filter(m => m.user.bot === true).size;
        let humanCount = serverSize - botCount;
        // console.log(message.member.presence)
        let onlineCount = message.guild.members.cache.filter(member => member.presence?.status === 'online' || member.presence?.status === 'dnd' || member.presence?.status === 'idle').size;
        let offlineCount = message.guild.members.cache.filter(member => member.presence?.status === 'offline').size;

        let verifLevels = {
            "NONE": "Nothing",
            "LOW": "Low - Must have a verified email on their Discord account",
            "MEDIUM": "Medium - Must also be registered on Discord for longer than 5 minutes",
            "HIGH": "High -  Must also be a member of this server for longer than 10 minutes",
            "HIGHEST": "Highest - Must have a verified phone on their Discord account",
        }

        function Size(input, type){
            if(input === 0){
                return `No ${type}`
            } else {
                return `${input} ${type}`
            }
            
        }

        function premiumTier(input, input2){
            if(input === 'NONE'){
                return `No boosts`
            } else {
                return `${input2} (Level ${input.slice(5, input.length)})`
            }
        }

        function nsfwLevel(input){
            if(input === 'DEFAULT'){
                return `Default`
            } else if(input === 'EXPLICIT'){
                return `Explicit`
            } else if(input === 'SAFE'){
                return `Safe`
            } else if(input === 'AGE_RESTRICTED'){
                return `Age restricted`
            }
        }


        let feature = {
            "ANIMATED_ICON": "Animated guild icon",
            "BANNER": "Banner",
            "COMMERCE": "Commerce features",
            "COMMUNITY": "Community features",
            "DISCOVERABLE": "Discoverable",
            "FEATURABLE": "Featurable",
            "INVITE_SPLASH": "Invite background",
            "MEMBER_VERIFICATION_GATE_ENABLED": "Membership Screening",
            "NEWS": "News",
            "PARTNERED": "Discord Partner",
            "PREVIEW_ENABLED": "Previewed Membership Screening",
            "VANITY_URL": "Special URL",
            "VERIFIED": "Verified",
            "VIP_REGIONS": "384kbps bitrate voices",
            "WELCOME_SCREEN_ENABLED": "Welcome Screen",
            "TICKETED_EVENTS_ENABLED": "Events",
            "MONETIZATION_ENABLED": "Monetization",
            "MORE_STICKERS": "More stickers",
            "THREE_DAY_THREAD_ARCHIVE": "Three days thread archive",
            "SEVEN_DAY_THREAD_ARCHIVE": "Seven days thread archive",
            "PRIVATE_THREADS": "Private threads",
            "THREADS_ENABLED": "Enabled threads"
        }

        let featurearray = [];

        guild.features.forEach(featu => {
            featurearray.push(feature[featu])
        })

        const embed = new Discord.MessageEmbed()
        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
        .setDescription(guild.description ? guild.description : `No description`)
        .setImage(guild.bannerURL({dynamic: true, size: 1024}))
        .addField(`Owner`, `<@${guild.ownerId}>`, true)
        .addField(`Total Members`, `${serverSize}`, true)
        .addField(`Created`, `${checkDays(guild.createdAt)}`, true)
        // colum
        .addField(`Roles`, `${Size(guild.roles.cache.size, 'roles')}`, true)
        .addField(`Emojis`, `${Size(guild.emojis.cache.size, 'emojis')}`, true)
        .addField(`Stickers`, `${Size(guild.stickers.cache.size, 'stickers')}`, true)
        //colum
        .addField(`You joined`, `${checkDays(message.member.joinedAt)}`, true)
        .addField(`Server Boost`, `<:boost:875400046898733067> ${premiumTier(guild.premiumTier, guild.premiumSubscriptionCount)}`, true)
        .addField(`Server ID`, `${guild.id}`, true)
        //colum
        .addField(`Locale`, `${guild.preferredLocale}`, true)
        .addField(`NSFW Level`, nsfwLevel(guild.nsfwLevel), true)
        .addField(`Vanity URL Code`, guild.vanityURLCode ? `discord.gg/${guild.vanityURLCode}` : `No vanity url code`, true)
        // colum
        .addField(
            `Channels`,
            `<:textchannel:875503853670387783>${Size(message.guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').size, 'texts')}<:transparent:875400047045525545><:voicechannel:875503853787828284>${Size(message.guild.channels.cache.filter(c => c.type === 'GUILD_VOICE').size, 'voices')}`,
            )
        //colum
        .addField(`Members`, `<:online:875400046793867275>${onlineCount}<:transparent:875400047045525545><:offline:875400047234273330>${serverSize-onlineCount}<:transparent:875400047045525545>:robot: ${botCount}`)
        // colum
        .addField(`Features`, featurearray.join(', '), true)
        // colum
        .addField(`Verification Level`, `${verifLevels[guild.verificationLevel]}`)
        .setTimestamp()
        message.channel.send({ embeds: [embed] });
        
        
  }
}