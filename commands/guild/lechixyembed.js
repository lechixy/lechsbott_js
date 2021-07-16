const { PREFIX } = require('../util/lechsbottUtil')


module.exports = {
    name:'filmrecomembed',
    description:'',
    async execute(client, message, args, cmd, Discord) {

        message.delete()

        const image = 'https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABeTnYOZq4GB-VyNC3j57OvJGIkmsOyvDMmWk73VdugMUEjIppKIXzBUK543u6-3izMjOChA3zvUs_i0-dbZhPlHVVZAa.jpg?r=1ef'
        
        const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username , message.author.displayAvatarURL({dynamic: true}), 'https://www.netflix.com/watch/80230399')
        .setTitle('EXTRACTION (Netflixde)')
        .setURL('https://www.netflix.com/watch/80230399')
        .setImage(image)
        .setDescription(`**Netflix Açıklaması**\nBir uyuşturucu baronunun kaçırılan oğlunu kurtarmak için Bangladeş'e gönderilen sert paralı asker, kendisini iç hesaplaşmalarla dolu bir yaşam mücadelesinin içinde bulur.
        \nHindistanda geçen bu filmde 2 tane baron vardır, baronlardan biri diğer baronun oğlunu kaçırır sonrası mükemmel Chris Hemsworth olan baş karakterimiz bu çocuğu kurtarmak için çocuğu kaçırılan barondan para alır ama yolun yarısında para gelmeyince ekibi gel desede gelmez devamını ise izleyin :)`)
        .addField(`:pushpin: Oyuncu kadrosu`, `Chris Hemsworth(Thor), Rudhraksh Jaiswal, Randeep Hooda...`, true)
        .addField(':books: Türler', 'Kitaplardan Uyarlanan, Filmler, Aksiyon ve Macera', true)
        .addField(':date: Çıkış Tarihi', '2020', true)
        .addField(':alarm_clock: Süre', '1 sa. 57dk.', true)
        .addField(':red_circle: Netflixde...', 'Filmlerde top 1 numaraydı', true)
        .addField(':film_frames: İzlemek isterseniz', '[Netflixde](https://www.netflix.com/watch/80230399)', true)
        .setFooter('tepki vermeyi unutmayın <3')
        .setTimestamp()
        message.channel.send(embed).then(m => {
            m.react('<:thumbs_up:863778834506711040>')
            m.react('<:thumbs_down:863778834255970325>')
            m.react('<:ntflx:854485718713106472>')
        })
        
        
  }
}