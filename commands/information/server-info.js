const Discord = require('discord.js');

module.exports = {
	name: "serverinfo",
	aliases: ['guild', 'server', 'sunucu', 'guild-info', 'sunucu-bilgi'],
	description: "Information from bot!",
	cooldown: 0,
	async execute(client, message, args, cmd, Discord){
		function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " day" : " day") + " ago";
        };
        let guild = message.channel.guild
        let serverSize = message.guild.memberCount;
        let botCount = message.guild.members.cache.filter(m => m.user.bot).size;
        let humanCount = serverSize - botCount;
        let verifLevels = ["Nothing", "Low - Account must be verified", "Medium - Must be registered on Discord for more than 5 minutes", "High - (╯ ° □ °） ╯︵ ┻━┻ - the member of the server must be longer than 10 minutes", "Very high - ┻━┻ ミ ヽ (ಠ 益 ಠ) ﾉ 彡 ┻━┻ - must have a verified phone number"];
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

		
			const loading = await message.channel.send(`Searching server information`);

let sunucu = new Discord.MessageEmbed()
.setAuthor(`${guild.name}`, message.guild.iconURL())
.setThumbnail(message.guild.iconURL())
.addField('Server Infos', `Server Name: **${guild.name}** \nServer ID: **${message.guild.id}** \nServer Owner: **${guild.owner}** \nLocation **${region[message.guild.region]}** \nCreated **${checkDays(message.guild.createdAt)}** `)
.addField(`Member Information `, `Total Member: **${humanCount}** \nTotal Bot: **${botCount}** \nTotal Role: **${guild.roles.cache.size}**`)
.addField(`Channels`, ` Text: **${message.guild.channels.cache.filter(c => c.type === 'text').size}** \n Voice: **${message.guild.channels.cache.filter(c => c.type === 'voice').size}** \n Category: **${message.guild.channels.cache.filter(c => c.type === 'category').size}**`)
.setTimestamp()
.setColor('FF0000')
.setFooter('lechsbott')
        return loading.edit('', sunucu);

	} 
}
	