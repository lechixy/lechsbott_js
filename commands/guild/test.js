const { lechsPlayer } = require('../music/utils/lechsPlayer')

module.exports = {
    name: 'test',
    description: '',
    async execute(client, message, args, cmd, Discord) {

        const embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
        .setTitle('Sex Education')
        .setURL('https://www.netflix.com/title/80197526')
        .setDescription(`Mordale'in bir okuluna giden Otis ve arkadaşı Maeve'in bir sex kliniği açması ile birlikte bu film başlıyor, sezon 1de mordalein sorunlarını gideren maeve ile otis birbirini aslında sevmektedir ama bir türlü kavuşamamaktadırlar... Gerisini izleyin canlar bence türkler tarafından batırılan sadece adında "sex" geçiyor diye underrated görülen bir film, izlerken çok iyi anlıyacaksınız...`)
        .addField(`📌 Oyuncu kadrosu`, `Asa Butterfield, Emma Mackey, Gillian Anderson...`, true)
        .addField(`📚 Türler`, `Çoğu olarak gençlik dizisi çoğu zaman komedi dahilinde`, true)
        .addField(`⌛ Süre`, `50dk civarı bölüm başına`, true)
        .addField(`🔎 Sezonlar`, `3 sezon ve yaklaşık sezon başına 8 bölüm`, true)
        .addField(`🎞️ Netflixde İzle`, `[İzlemek için tıkla](https://www.netflix.com/title/80197526)`, true)
        .setImage('https://static.wikia.nocookie.net/sex-education-netflix/images/5/5a/Episode_8.jpg/revision/latest?cb=20190904081429')
        .setTimestamp()
        .setFooter('devamı için tepki <3')
        await message.channel.send({ embeds: [embed] }).then(msg => {
            msg.react('❤️')
            msg.react('👎')
            msg.react('<:ntlfx:854485718713106472>')
        })

        // const cls = new lechsPlayer(message.guild.id)
        // console.log(cls.player().pause())

        // const Voice = require('@discordjs/voice')
        // const voice_channel = message.member.voice.channel

        // let player = Voice.getVoiceConnection(message.guild.id)
        
        // try {
        //     player._state.subscription.player.unpause()
        // } catch (err) {
        //     console.log(err)
        // }

    }
}