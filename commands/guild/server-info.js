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
        let botCount = message.guild.members.cache.filter(m => m.user.bot).size;
        let humanCount = serverSize - botCount;

        let verifLevels = {
            "NONE": "Nothing",
            "LOW": "Low - Must have a verified email on their Discord account",
            "MEDIUM": "Medium - Must also be registered on Discord for longer than 5 minutes",
            "HIGH": "High -  Must also be a member of this server for longer than 10 minutes",
            "HIGHEST": "Highest - Must have a verified phone on their Discord account",
        }
        

        const embed = new Discord.MessageEmbed()
        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
        .setThumbnail(guild.iconURL({dynamic: true}))
        .setImage(guild.bannerURL({dynamic: true}))
        .addField(`Owner`, `<@${guild.ownerId}>`, true)
        .addField(`Region`, `${region[guild.region]}`, true)
        .addField(`Channels`, `Categories **${message.guild.channels.cache.filter(c => c.type === 'category').size}**
        Text **${message.guild.channels.cache.filter(c => c.type === 'text').size}**
        Voice **${message.guild.channels.cache.filter(c => c.type === 'voice').size}**`, true)
        // colum
        .addField(`Guild ID`, `${guild.id}`, true)
        .addField(`Members`, `${humanCount}`, true)
        .addField(`Bots`, `${botCount}`, true)
        // colum
        .addField(`Roles`, `${guild.roles.cache.size}`, true)
        .addField(`Emojis`, `${guild.emojis.cache.size}`, true)
        .addField(`Stickers`, `${guild.stickers?.cache?.size}`, true)
        .addField(`Created`, `${checkDays(guild.createdAt)}`)
        .addField(`Verification Level`, `${verifLevels[guild.verificationLevel]}`)

        
        message.channel.send({ embeds: [embed] });
        
        
  }
}