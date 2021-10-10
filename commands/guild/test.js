const {parse, stringify} = require('flatted');

module.exports = {
    name: 'test',
    description: '',
    async execute(client, message, args, cmd, Discord) {

        const queue = client.queue
        const server_queue = queue.get(message.guild.id)

        try {


            const obj = []
            obj.push(server_queue.player)
            const res = stringify(obj)
            const prse = parse(res)
            console.log(prse)


        } catch (err) {
            console.log(err)
        }
    }
}