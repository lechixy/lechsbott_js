module.exports = {
    name: 'date',
    description: "Broadcast someone's avatar!",
    aliases: ["now", "whatisdate", "clock", "calendar"],
    cooldown: 0,
    async execute(client, message, args, cmd, Discord) {
        let time = new Date()
        
        let dateembed = new Discord.MessageEmbed()
        .setDescription(time)
        .setColor("ffffff")
        
        message.channel.send(dateembed)
    }
}