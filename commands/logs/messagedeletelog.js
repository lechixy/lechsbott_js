module.exports = async (client, Discord) =>{
    const guild = client.guilds.cache.get('840543133007609907');
    const sendchannel = client.channels.cache.get('869583934994935878')

    let lastid = null
    setInterval( async () =>{
        const fetch = await guild.fetchAuditLogs({limit: 1, type: "MESSAGE_DELETE"})

        // if(lastid === null){
            

        //     const embed = new Discord.MessageEmbed()
        //     .setTitle('Deleted Message')
        //     .setDescription(`Description`)
        //     .addField(`Something`, `Something`, true)
        //     .addField(`Something`, `Something`)
        //     message.channel.send(embed);

        // } else if(fetch.entries.id === lastid){

        // }

        console.log(fetch.entries.get('869588739431731271').extra)
    }, 5000);
}