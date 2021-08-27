const moment = require('moment');

module.exports = {
    name: 'test',
    description: '',
    async execute(client, message, args, cmd, Discord) {

        const sw = client.queue.get(message.guild.id)

        // const songduration = sw.resource.playbackDuration
        // const elapsedtime = `${moment.duration(songduration).minutes()}:${moment.duration(songduration).seconds()}`

        function timeConverter(timestamp){
            const split = timestamp.split(':')
    
            let [ minute, second ] = split;
    
            return (minute*60+second*1)
        }

        const min = '15:2'

        console.log(timeConverter(min))
        
    }
}