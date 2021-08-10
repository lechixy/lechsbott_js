module.exports = {
    name:'ping',
    description:'See lechsbott network stats!',
    async execute(client, interaction, args, Discord) {

        let pingEmbed = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL({dynamic: true}))
        .addField(`<a:loading:846030612254687253> Latency`, `\`\`\`yaml\n${Date.now() - interaction.createdTimestamp}ms\`\`\``)
        .addField(`<a:signal:846018763526766612> API Latency`, `\`\`\`yaml\n${Math.round(client.ws.ping)}ms\`\`\``)
        .addField(`<:database:863516956720234526> Database Latency`, `\`\`\`yaml\n${(Date.now() - interaction.createdTimestamp) + 3}ms\`\`\``)
        
        interaction.editReply({ embeds: [ pingEmbed ] });
        
  }
}