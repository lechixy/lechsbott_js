module.exports = {
    name: 'reload',
    aliases: 'reloadacmd',
    description: '',
    async execute(client, message, args, cmd, Discord) {
        const { OWNER1 } = require("../util/lechsbottUtil");
        const { OWNER2 } = require("../util/lechsbottUtil");

        if(message.author.id == OWNER1 || message.author.id == OWNER2){
            if(!args[0]) return message.channel.send('You need to include the category of the command');
            if(!args[1]) return message.channel.send('You need to include the name of the command!');
    
            let category = args[0];
            let command = args[1].toLowerCase();
            try {
                delete require.cache[require.resolve(`../../commands/${category}/${command}.js`)]//Change the path depending on how are your folders located.
                client.commands.delete(command);
                const pull = require(`../../Commands/${category}/${command}.js`);
                client.commands.set(command, pull);
    
                return message.channel.send(`**${command}** was reloaded succesfully!`);
            } catch (error) {
                return message.channel.send(`There was an error trying to reload **${command}**: \`${error.message}\``);
            }
        } else {
            message.channel.send('This is an owner command, you can\'t use it!').then(message => {
                message.delete({ timeout: 3000 })
            })
        }

    }
}