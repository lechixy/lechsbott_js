const { MessageButton, MessageActionRow, createButtonCollector } = require('discord-buttons')

module.exports = {
    name:'btest',
    description:'Discord buttons!',
    async execute(client, message, args, cmd, Discord) {

        let option1 = new MessageButton()
        .setLabel('Watch YouTube Together')
        .setStyle('red')
        .setID('menuid1')
        let option2 = new MessageButton()
        .setLabel('Play Poker Night')
        .setStyle('blurple')
        .setID('menuid2')
        let option3 = new MessageButton()
        .setLabel('Play Betrayal.io')
        .setStyle('grey')
        .setID('menuid3')
        let option4 = new MessageButton()
        .setLabel('Play Fishington.io')
        .setStyle('green')
        .setID('menuid4')

        let row = new MessageActionRow()
        .addComponents(option1, option2, option3, option4);

        const resultembed = new Discord.MessageEmbed()
        .setAuthor(`Select`, message.author.displayAvatarURL({dynamic: true}))

        
        message.channel.send(resultembed, row)

        client.on('clickButton', async (button) => {
            if(!button.clicker.id === message.author.id) return;
            
            if(button.id === 'menuid1'){
                button.reply.defer()
                console.log('1')
            }

        })

  }
}