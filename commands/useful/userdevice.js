module.exports = {
    name: 'userdevice',
    aliases: 'userdevices',
    description: 'check user devices',
    async execute(client, message, args, cmd, Discord) {

        let user;
        if(message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else {
            user = message.author;
        }

        const devices = user.presence?.clientStatus || {};

        const description = () => {
            const entries = Object.entries(devices)
                .map((value, index) => `${index + 1}) ${value[0][0].toLowerCase()}${value[0].slice(1)}`)
                .join(" ");
            return `${entries}`;
        }
        const embed = new Discord.MessageEmbed()
        .setAuthor(user.username, user.displayAvatarURL({dynamic: true}))
        .setTitle(`Devices`)
        .setDescription(description())
        .addField(`Device logged in`, Object.entries(devices).length)
        message.channel.send(embed);

    }
}