const { PREFIX } = require("../util/lechsbottUtil");

module.exports = {
	name: "slowmode",
	aliases: ["setslow", "cooldown", "setcooldown"],
	description: 'Set slow mode for a text channel',
	category: ['Moderation'],
	arguments: `<number between 0 and 21600>`,
	userPerms: ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'],
	clientPerms: ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'],
	async execute(client, message, args, cmd, Discord) {

		if (!args[0] || isNaN(args[0])) {
			let argsembed = new Discord.MessageEmbed()
				.setDescription(`**You need to type number value for slowmode**`)
				.addField("Usage", `${PREFIX}${cmd} <10>`);
			return message.channel.send({ embeds: [argsembed] }).then(m => {
				setTimeout(function () { m.delete() }, 10000)
			})
		}

		if (args[0] > 21600 || args[0] < 0) {
			let number1embed = new Discord.MessageEmbed()
				.setDescription(`**Number value must be between 0 - 21600**`)
				.addField("Usage", `${PREFIX}${cmd} <max 21600 seconds>`);
			return message.channel.send({ embeds: [number1embed] }).then(m => {
				setTimeout(function () { m.delete() }, 10000)
			})
		}
		const channel =
			message.mentions.channels.first() ||
			message.guild.channels.cache.get(args[1]) ||
			message.channel;

		channel.setRateLimitPerUser(args[0]);

		if (args[0] === "0") {
			let settedembed = new Discord.MessageEmbed().setDescription(
				`**Slow mode is disabled for** <#${channel.id}>`
			);
			return message.channel.send({ embeds: [settedembed] }).then(m => {
				setTimeout(function () { m.delete() }, 10000)
			})
		} else {
			let settedembed = new Discord.MessageEmbed().setDescription(
				`**Slow mode is enabled for** <#${channel.id}>\nMembers can send one message every ${args[0]} seconds!`
			);
			return message.channel.send({ embeds: [settedembed] }).then(m => {
				setTimeout(function () { m.delete() }, 10000)
			})
		}

	},
};
