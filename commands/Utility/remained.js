const { PREFIX } = require('../util/lechsbottUtil')

module.exports = {
    name:'timefor',
    aliases: ['timeto', 'lefted', 'date', 'remained'],
    description:'See how much lefted to date!',
    category: ['Utility'],
    arguments: `<Date Formats | Date>`,
    async execute(client, message, args, cmd, Discord) {
        
        if(!args[0]) {
            const embed = new Discord.MessageEmbed()
            .setDescription(`**I think there is no date within name "blank" please specify a date!**`)
            return message.channel.send({ embeds: [embed] });
        }

        const definedyear = args.join(' ')
        
        countdown()

        function countdown() {
            
            const newYearsDate = new Date(definedyear)
            const currentDate = new Date()

            const totalSeconds = (newYearsDate - currentDate) / 1000

            const days = (Math.floor(totalSeconds / 3600 / 24)).toString()
            const hours = (Math.floor(totalSeconds / 3600) % 24).toString()
            const mins = (Math.floor(totalSeconds / 60) % 60).toString()
            const seconds = (Math.floor(totalSeconds) % 60).toString()

            if(seconds.startsWith('-')){
                const embed = new Discord.MessageEmbed()
                .setTitle(`Pasted from ${definedyear}`)
                .setDescription(`**${fixNumber(days)}** days **${fixNumber(hours)}** hours **${fixNumber(mins)}** minutes **${fixNumber(seconds)}** seconds`)
                message.channel.send({ embeds: [embed] });
            } else {
                const embed = new Discord.MessageEmbed()
                .setTitle(`Lefted to ${definedyear}`)
                .setDescription(`**${formatTime(days)}** days **${formatTime(hours)}** hours **${formatTime(mins)}** minutes **${formatTime(seconds)}** seconds`)
                message.channel.send({ embeds: [embed] });
            }
        }

        function formatTime(time) {
            return time < 10 ? `0${time}` : time;
        }

        function fixNumber(time) {
            return time.slice(1, time.length)
        }
        
        
  }
}