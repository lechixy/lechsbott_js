module.exports = {
    name:'sendmessage',
    description:'You can send a message to specific channel!',
    options: [
      {
        name: "channel",
        description: "Text channel to will send",
        required: true,
        type: "CHANNEL",
      },
      {
        name: "message",
        description: "Message to will send",
        required: true,
        type: "STRING",
      }
    ],
    async execute(client, interaction, args, Discord) {

        const [ channel, message ] = args;

        const sendchannel = interaction.guild.channels.cache.get(channel)

        sendchannel.send(message)
        
        interaction.followUp({ content: `Message sended to \`${sendchannel.name}\``, ephemeral: true });
        
  }
}