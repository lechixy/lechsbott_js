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
        .setDescription(
                    `**ID |** ${guild.id}\n
                    **OWNER |** <@${guild.owner.id}>\n
                    **REGION |** ${region[guild.region]}\n
                    **CREATED |** ${checkDays(guild.createdAt)}\n
                    **VERIF LEVEL |** ${verifLevels[guild.verificationLevel]}\n

                    **TOTAL |** ${humanCount}\n
                    **BOTS |** ${botCount}\n
                    **ROLES |** ${guild.roles.cache.size}\n

                    **TEXT |** ${message.guild.channels.cache.filter(c => c.type === 'text').size}\n
                    **VOICE |** ${message.guild.channels.cache.filter(c => c.type === 'voice').size}\n
                    **CATEGORY |** ${message.guild.channels.cache.filter(c => c.type === 'category').size}
                    `)
        message.channel.send(embed);
        
        
  }
}