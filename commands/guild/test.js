const {lechs_paginator} = require('../util/lechsbottPaginator')

module.exports = {
    name: 'test',
    description: '',
    async execute(client, message, args, cmd, Discord) {

        const a = new Discord.MessageEmbed().setTitle('Page 1')
        const b = new Discord.MessageEmbed().setTitle('Page 2')
        const c = new Discord.MessageEmbed().setTitle('Page 3')

        const pages = [a, b, c]

        lechs_paginator(message, pages)
        
    }
}