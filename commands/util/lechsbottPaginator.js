const Discord = require('discord.js')

const lechs_paginator = async (message, pages) => {
    if (!message && !message.channel) throw new Error('Provide a message to access channel')
    if (!pages) throw new Error('Provide pages to lechs_paginator')

    let page = 0

    const row = new Discord.MessageActionRow()
        .addComponents([
            new Discord.MessageButton()
                .setEmoji('⬅')
                .setCustomId('backbutton')
                .setStyle('PRIMARY'),
            new Discord.MessageButton()
                .setEmoji('➡')
                .setCustomId('nextbutton')
                .setStyle('PRIMARY')
        ])
    const deathrow = new Discord.MessageActionRow()
        .addComponents([
            new Discord.MessageButton()
                .setEmoji('⬅')
                .setCustomId('backbutton')
                .setStyle('PRIMARY')
                .setDisabled(true),
            new Discord.MessageButton()
                .setEmoji('➡')
                .setCustomId('nextbutton')
                .setStyle('PRIMARY')
                .setDisabled(true)
        ])

    const currentpage = await message.channel.send({ embeds: [pages[0]], components: [row] })

    const collector = currentpage.createMessageComponentCollector({ componentType: 'BUTTON', time: 120000 });

    collector.on('collect', async i => {
        i.deferUpdate()

        if (i.user.id !== message.author.id) {
            i.reply({ content: `These buttons aren't for you, cannot use them!`, ephemeral: true });
            return
        }

        if (i.customId === 'nextbutton') page = page > 0 ? --page : pages.length -1;
        if (i.customId === 'backbutton') page = page + 1 < pages.length ? ++page : 0

        currentpage.edit({ embeds: [pages[page]], components: [row] })

    });

    collector.on('end', collected => {
        if (!currentpage.deleted) {
            currentpage.edit({ content: `This message now disabled for 120s inactivity`, embed: pages[page], components: [deathrow] })
        }
    })

}

exports.lechs_paginator = lechs_paginator;