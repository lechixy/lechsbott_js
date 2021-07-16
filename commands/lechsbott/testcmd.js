const { PREFIX } = require('../util/lechsbottUtil')

module.exports = {
    name:'testcmd',
    description:'',
    async execute(client, message, args, cmd, Discord) {

      let playing = new Discord.MessageEmbed()
      .setAuthor(name= `Now playing`, icon_url= `${message.author.displayAvatarURL({dynamic: true})}`)
      .setTitle(`BLACKPINK - 'How You Like That' M/V`)
      .setURL(`https://youtube.com/watch?v=ioNng23DkIM`)
      .setFooter(`Added by ${song.addedby}`)
      .setTimestamp()
      await message.channel.send(playing)
  }
}