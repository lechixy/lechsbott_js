module.exports = {
    name: 'fun',
    aliases: 'randomfun',
    description: 'A fun command!',
    async execute(client, message ,args, cmd, Discord){
        let couchemote = `<:couch1:854407803954659398><:couch2:854407803766964225><:couch3:854407804147073144>`
        let whyareugay = `+ **Why are you <a:gay:846030610706333726>**\n- **Who says i am <a:gay:846030610706333726>**\n+ **You are <a:gay:846030610706333726>**`
        let mevsday = `**my feelings that change so fast during the day:** <a:random:849327721032450098>`
        let zerotwo = `<a:zerotwo:854414118776864778> **wow! a secret zero two feature discovered by <@${message.author.id}>\n🎁 here is your suprise:** ||https://www.youtube.com/watch?v=yoZy2E17-50||`
        let mewhenthinkinguser = `**me when i thinking <@${message.author.id}> in bath uwu <a:thinkinghmm:849327710551277688>**`
        let loveyouuuserr = `**if no one love you... <a:ccacan:854427461068128268> just remember i here for youu <@${message.author.id}>\nlovee youu soo muchh <a:bearhug:854424829481451530>**`
        let hitteduser = `**<a:bearhit:854424829335568415> HAAAAAAAAA for <@${message.author.id}>**`
        let sorrydude = `**s-s-sorry... <@${message.author.id}> <a:sorrydude:854424832443023381>**`

        let funs = [
            `${couchemote}`,
            `${whyareugay}`,
            `${mevsday}`,
            `${zerotwo}`,
            `${mewhenthinkinguser}`,
            `${loveyouuuserr}`,
            `${hitteduser}`,
            `${sorrydude}`,
        ]

        const randomgen = Math.floor(Math.random() * (funs.length));
        message.channel.send(funs[randomgen])
        
    }
}