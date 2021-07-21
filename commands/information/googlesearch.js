module.exports = {
    name: 'gsearch',
    aliases: ['searchg', 'websearch', 'google'],
    description: '',
    async execute(client, message, args, cmd, Discord) {
        if(!message.author.id === '391511241786654721') {
            return message.channel.send('You can\'t use it now this is a **beta command** for owner!')
        }
        const google = require("google-search-scraper-nodejs");

        usersearch = args.join(' ')

        function get_data(response){
            var data=response["body"]
            console.log("data",data)	
        }
        function fetch_results(){
            google.search_results(get_data)
        }

        const search = google.search(usersearch, fetch_results)
        
    }
}