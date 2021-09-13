const ytSearch = require('yt-search')

module.exports = {
    name: 'youtube',
    description: 'Search videos on YouTube',
    options: [
        {
            name: 'search',
            description: 'What want you search on YouTube?',
            type: 'STRING',
            required: true,
        }
    ],
    async execute(client, interaction, args, Discord) {

        const video = await video_finder(args[0]);
        if (video) {
            interaction.followUp(video.url)
        } else {
            const embed = new Discord.MessageEmbed().setDescription(
                `**No videos found within** \`${args.join(' ')}\` **on YouTube!**`
            );
            return interaction.followUp({ embeds: [embed] });
        }
    }
}