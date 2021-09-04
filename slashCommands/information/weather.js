const weather = require('weather-js');

module.exports = {
    name: 'weather',
    description: 'Show a locations weather forecast!',
    options: [
        {
            name: 'location',
            description: 'Which location do you want to see the weather forecast for?',
            type: 'STRING',
            required: true,
        }
    ],
    async execute(client, interaction, args, Discord) {
        
        const searcher = args;

        weather.find({search: searcher, degreeType: 'C'}, function (error, result){
            // 'C' can be changed to 'F' for farneheit results
            if(error) return interaction.followUp(error);
    
            if(result === undefined || result.length === 0) return interaction.followUp('Invalid location, please sure typed correctly');
    
            var current = result[0].current;
            var location = result[0].location;
    
            const weatherinfo = new Discord.MessageEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`Weather forecast for ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .addField('Timezone', `UTC${location.timezone}`, true)
            .addField('Degree Type', 'Celsius', true)
            .addField('Temperature', `${current.temperature}°`, true)
            .addField('Wind', current.winddisplay, true)
            .addField('Feels like', `${current.feelslike}°`, true)
            .addField('Humidity', `${current.humidity}%`, true)
            .setTimestamp()
            interaction.followUp({ embeds: [weatherinfo] })
            }) 
        
 }
}