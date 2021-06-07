module.exports = {
    name: "about",
    aliases: [''],
    cooldown: 0,
    description: "welcome to the lab",
    async execute(client, message, args, cmd, Discord) {

        let botembed = new Discord.MessageEmbed()
        .setAuthor('lechsbott', `${message.author.displayAvatarURL()}`)
        .setDescription(`Yeeyyy a secret prefix discovered! Welcome ${message.author.username}, this is lechsbott default prefix if you need help or learn about check below!`)
        .addField('📚 For help', '\`l!help\`', true)
        .addField('🎟 Version', '\`lechsbott beta 0.79\`', true)
        .addField('✨ Creator', '\`! *A Lechixy 🦋#8280\`', true)
        message.channel.send(botembed)
    }
}