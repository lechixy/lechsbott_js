

module.exports = {
    name: 'test',
    description: '',
    async execute(client, message, args, cmd, Discord) {

        const commands = client.commands
        const cmds = []
        commands.each(cmd => {
            if(!cmd.category) return

            if(cmd.category.includes('Music')){
                cmds.push(cmd.name)
            }
        })
        console.log(cmds.join('\n'))
    }
}