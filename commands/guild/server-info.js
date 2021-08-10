const { PREFIX } = require('../util/lechsbottUtil')


module.exports = {
    name:'serverinfo',
    aliases:['server-info'],
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
        }



        const embed = new Discord.MessageEmbed()
        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
        .setImage(guild.bannerURL({dynamic: true, size: 1024}))
        .addField(`👤 Owner`, `<@${guild.ownerId}>`, true)
        .addField(`👥 Members`, `${humanCount}`, true)
        .addField(`📆 Created`, `${checkDays(guild.createdAt)}`, true)
        // colum
        .addField(`🗂 Categorys`, Size(message.guild.channels.cache.filter(c => c.type === 'GUILD_CATEGORY').size, 'categorys'), true)
        .addField(`💬 Texts`, Size(message.guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').size, 'texts'), true)
        .addField(`🔊 Voices`, Size(message.guild.channels.cache.filter(c => c.type === 'GUILD_VOICE').size, 'voices'), true)
        // colum
        .addField(`🎭 Roles`, `${Size(guild.roles.cache.size, 'roles')}`, true)
        .addField(`🥳 Emojis`, `${Size(guild.emojis.cache.size, 'emojis')}`, true)
        .addField(`✨ Stickers`, `${Size(guild.stickers.cache.size, 'stickers')}`, true)
        // colum
        .addField(`Features`, guild.features.join(', '), true)
        // colum
        .addField(`🛡 Verification Level`, `${verifLevels[guild.verificationLevel]}`)
        .setFooter(`${guild.id}`)
        .setTimestamp()
        message.channel.send({ embeds: [embed] });
        
        
  }
}