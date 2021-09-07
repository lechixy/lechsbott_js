const fetch = require('node-fetch');

const Discord = require('discord.js');

module.exports = {
    name: "covid",
    description: "Track a country or worldwide COVID-19 cases",
    aliases: ["korona", "virus", "virüs"],
    cooldown: 0,
    async execute(client, message, args, cmd, Discord){

        let countries = args.join(" ");

        const noArgs = new Discord.MessageEmbed()
        .setTitle('Missing arguments')
        .setColor(0xff0000)
        .setDescription('You are missing some args (ex: ;covid all || ;covid England)')
        .setTimestamp()

        if(!args[0]) return message.channel.send({ embeds: [noArgs] });

        if(args[0] === "all"){
            fetch(`https://covid19.mathdro.id/api`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                const embed = new Discord.MessageEmbed()
                .setTitle(`Worldwide COVID-19 Stats 🌎`)
                .setColor(0xff0000)
                .addField('Confirmed Cases', confirmed)
                .addField('Recovered', recovered)
                .addField('Deaths', deaths)
                .setFooter('lechsbot')
                .setTimestamp()

                message.channel.send({ embeds: [embed] })
            })
        } else {
            fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                const embed = new Discord.MessageEmbed()
                .setTitle(`COVID-19 Stats for **${countries}**`)
                .setColor(0xff0000)
                .addField('Confirmed Cases', confirmed)
                .addField('Recovered', recovered)
                .addField('Deaths', deaths)
                .setFooter('lechsbot')
                .setTimestamp()

                message.channel.send({ embeds: [embed] })
            }).catch(e => {
                return message.channel.send('Invalid country provided')
            })
        }
    }
}