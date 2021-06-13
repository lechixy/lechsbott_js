module.exports = {
    name: 'setstatus',
    cooldown: '0',
    aliases: ['statusto', 'status'],
    description: '',
    async execute(client, message, args, cmd, Discord) {

        if(!args.length) {
            let argsnotdefined = new Discord.MessageEmbed()
            .setColor('FF0000')
            .setDescription('There was a mistake! Forgetted somethings, check below!')
            .addField('Need to', 'default/streaming')
            message.channel.send(argsnotdefined)
        } 

        if(!message.author.id === '391511241786654721' || message.author.id === '852935953907056662') {
            let sorryembed = new Discord.MessageEmbed()
            .setColor('DC143C')
            .setDescription('Sorry but this is an owner command you can\'t use it!')
            message.channel.send(sorryembed)
        }

        if(args[0] === 'streaming') {
            if(!args[1]) {
                let nullembed = new Discord.MessageEmbed()
                .setColor('DC143C')
                .setDescription('Need to a streamer name **<elraenn/gicaas>**')
                message.channel.send(nullembed)
            } else {
            let actvs = `${args[1]} now!`
                
            client.user.setActivity(actvs, {
                type: 'STREAMING',
                url: `https://www.twitch.tv/${args[1]}`,
            }); 

            let succesfully = new Discord.MessageEmbed()
            .setColor('00FF00')
            .setDescription(`Status setted to **${args[1]}** now!`)
            message.channel.send(succesfully)
            }

        } else if (args[0] === 'default'){
            let actvs = [
                // `the ${client.users.cache.size} users!`,
                `just under development!`,
                `just under development!`,
            ];
        
            
            const index = Math.floor(Math.random() * (actvs.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
            client.user.setActivity(actvs[index], { type: 'WATCHING' }); // sets bot's activities to one of the phrases in the arraylist.
        
            let succesfully = new Discord.MessageEmbed()
            .setColor('00FF00')
            .setDescription(`Status **resetted** now!`)
            message.channel.send(succesfully)
        }

    }
}
