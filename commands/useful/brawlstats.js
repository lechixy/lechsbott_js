const fetch = require("node-fetch")
const { BS_API_KEY, PREFIX } = require("../util/lechsbottUtil")

module.exports = {
    name:'brawlstats',
    aliases:['brawlprofile', 'brawlers', 'events', 'club', 'leaderboards', 'leaderboard'],
    description:'Look user brawlstats!',
    category: ['Useful'],
    async execute(client, message, args, cmd, Discord) {
        
        if(cmd === 'brawlstats' || cmd === 'brawlprofile'){
            if(!args[0]){
                const embed = new Discord.MessageEmbed()
                .setAuthor(`You need to specify somethings for brawlstats!`, message.author.displayAvatarURL({dynamic: true}))
                .addField(`Usage`, `${PREFIX}brawlprofile <brawl stars user tag>`, true)
                .addField(`Need help?`, `${PREFIX}help brawlstats`, true)
                return message.channel.send({ embeds: [embed] });
            }
            let usertag;
            if(args[0].startsWith('#')) usertag = args[0].slice(1, args[0].length)
            else usertag = args[0]
    
            fetch(`https://api.brawlstars.com/v1/players/%23${usertag}`, {
                method: "GET",
                headers: {"Accept": "application/json" ,"authorization": `Bearer ${BS_API_KEY}`}
            }).then(response => response.json()).then(async res => {
    
                if(res.reason === `notFound`){
                    const embed = new Discord.MessageEmbed()
                    .setAuthor(`There is no Brawl Stars Player with ${usertag} tag!`, message.author.displayAvatarURL({dynamic: true}))
                    return message.channel.send({ embeds: [embed] });
                } else if(res.reason === `accessDenied.invalidIp`){
                    const embed = new Discord.MessageEmbed()
                    .setAuthor(`There a problem with Brawl Stars API please contact with bot owner!`, message.author.displayAvatarURL({dynamic: true}))
                    return message.channel.send({ embeds: [embed] });
                }
    
                let profile = {
                    result: null,
                    icon: null,
                    brawlericon: `https://cdn.brawlstats.com/player-thumbnails/${res.icon.id}.png`,
                    league: null,
                    clubname: null,
                    clubtag: null
                }
    
                if(res.isQualifiedFromChampionshipChallenge === false){
                    profile.result = `Not qualified`
                } else if(res.isQualifiedFromChampionshipChallenge === true){
                    profile.result = `Qualified`
                }
    
                if(res.club.name === undefined){
                    profile.clubname = `<:brawlcross:863846972279881760> Isn't in a club`
                    profile.clubtag = `<:brawlcross:863846972279881760> Isn't in a club`
                } else {
                    profile.clubname = res.club.name
                    profile.clubtag = res.club.tag
                }
                
                if(res.trophies < 500){
                    profile.league = `<:league0_500:863860993468661761>`
                } else if(res.trophies < 1000){
                    profile.league = '<:league500_1k:863860995180724235>'
                } else if(res.trophies < 2000){
                    profile.league = '<:league1k_2k:863860993759248394>'
                } else if(res.trophies < 3000){
                    profile.league = '<:league2k_3k:863860993875640340>'
                } else if(res.trophies < 4000){
                    profile.league = '<:league4k_6k:863860994148401193>'
                } else if(res.trophies < 6000){
                    profile.league = '<:league6k_8k:863860994102788096>'
                } else if(res.trophies < 8000){
                    profile.league = '<:league8k_10k:863860994551971870>'
                } else if(res.trophies < 10000){
                    profile.league = '<:league10k_16k:863860995180068914>'
                } else if(res.trophies < 16000){
                    profile.league = '<:league16k_30k:863860995340238859>'
                } else if(res.trophies < 30000){
                    profile.league = '<:league30k_50k:863860995193569290>'
                } else if(res.trophies < 50000){
                    profile.league = '<:league50k:863860995339976704>'
                } else if(res.trophies > 50000){
                    profile.league = '<:league1k_2k:863860995222011915>'
                } 
    
                let resultembed = new Discord.MessageEmbed()
                .setAuthor(`${res.name} • ${res.tag}`)
                .setThumbnail(profile.brawlericon)
                .addField(`<:experience:863840041142059028> Experience Level`, `**${res.expLevel}**`, true)
                .addField(`${profile.league} Trophies`, `**${res.trophies}**`, true)
                .addField(`<:brawltrophy:863837978865696789> Highest Trophies`, `**${res.highestTrophies}**`, true)
                //new paragraph
                .addField(`<:3vs3:863837978802389002> 3v3 Victories`, `**${res['3vs3Victories']}**`, true)
                .addField(`<:showdown_solo:863837979474657280> Solo Victories`, `**${res.soloVictories}**`, true)
                .addField(`<:showdown_duo:863837978870546442> Duo Victories`, `**${res.duoVictories}**`, true)
                //new paragraph
                .addField(`<:highestppp:863838132923662366> Highest PP Points`, `**${res.highestPowerPlayPoints}**`, true)
                .addField(`<:clanbadge:863840579070328853> Club Name`, `**${profile.clubname}**`, true)
                .addField(`<:tag:863842838869442591> Club Tag`, `**${profile.clubtag}**`, true)            
                //new paragraph
                .addField(`<:brawl:863885092404985857> Championship`, `**${profile.result}**`, true)
                message.channel.send({ embeds: [resultembed] });
    
            })    
        }
        else if(cmd === 'brawlers'){
            if(!args[0]){
                const embed = new Discord.MessageEmbed()
                .setAuthor(`You need to specify somethings for brawlers!`, message.author.displayAvatarURL({dynamic: true}))
                .addField(`Usage`, `${PREFIX}brawlers <brawl stars user tag>`, true)
                .addField(`Need help?`, `${PREFIX}help brawlstats`, true)
                return message.channel.send({ embeds: [embed] });
            }
            let usertag;
            if(args[0].startsWith('#')) usertag = args[0].slice(1, args[0].length)
            else usertag = args[0]
    
            fetch(`https://api.brawlstars.com/v1/players/%23${usertag}`, {
                method: "GET",
                headers: {"Accept": "application/json" ,"authorization": `Bearer ${BS_API_KEY}`}
            }).then(response => response.json()).then(async res => {
    
                if(res.reason === `notFound`){
                    const embed = new Discord.MessageEmbed()
                    .setAuthor(`There is no Brawl Stars Player with ${usertag} tag!`, message.author.displayAvatarURL({dynamic: true}))
                    return message.channel.send({ embeds: [embed] });
                }
                if(res.reason === `accessDenied.invalidIp`){
                    const embed = new Discord.MessageEmbed()
                    .setAuthor(`There a problem with Brawl Stars API please contact with bot owner!`, message.author.displayAvatarURL({dynamic: true}))
                    return message.channel.send({ embeds: [embed] });
                }

                const pp = client.emojis.cache.get("664267845336825906")

                const profileicon = `https://cdn.brawlstats.com/player-thumbnails/${res.icon.id}.png`

                const embed = new Discord.MessageEmbed()
                .setAuthor(`${res.name} | ${res.tag}`)
                .setThumbnail(profileicon)

                let emojis = {
                    page: null,
                    powerpoint: '<:powerpoint:863915498647322685>',
                    icon: null,
                    rank: null,
                    hrank: null,
                    sp: null,
                    levelsp: '<:sp:864258881869840444>',
                    gadget: null,
                    shelly: '<a:shelly:863917722643202058>',
                    colt: '<a:coltkalp:860070890312826900>',
                    bull: '<:bull:863919751145979954>',
                    brock: '<a:brock:863920206395867147>',
                    rico: '<a:rico:863920681891921921>',
                    spike: '<a:spike:863925640390901770>',
                    barley: '<a:barley:863925637978128406>',
                    jessie: '<a:jessie:863925639837253702>',
                    nita: '<a:nita:863925636263182367>',
                    dyna: '<:dyna:863925610237001738>',
                    elprimo: '<a:elprimo:863925638650265621>',
                    mortis: '<a:mortis:857248459525455887>',
                    crow: '<:crow:863925607913226310>',
                    poco: '<a:poco:863925636313907240>',
                    bo: '<:bo:863925607528529920>',
                    piper: '<a:piper:857248459525455887>',
                    pam: '<a:pam:863925638829703248>',
                    tara: '<a:tara:863925638251544576>',
                    darrly: '<:darrly:863925607792508928>',
                    penny: '<:penny:834010353167106099>',
                    frank: '<a:frank:863925638992756747>',
                    gene: '<a:gene:863925637823856650>',
                    tick: '<a:tick:858718481302028318>',
                    leon: '<:leon:863925608777515048>',
                    rosa: '<:rosa:863925611944214578>',
                    eightbit: '<a:8bit:863938985267822652>',
                    amber: '<:amber:863938971305246740>',
                    bea: '<a:bea:863938989320044555>',
                    belle: '<:bea:863938974879318016>',
                    bibi: '<a:bibi:863938989069041694>',
                    buzz: '<:buzz:863938974153834506>',
                    byron: '<:byron:863938973231874050>',
                    carl: '<a:carl:863938988754468865>',
                    collette: '<:collette:863938974825185301>',
                    edgar: '<:edgar:863938974333272105>',
                    emz: '<a:emz:863938989106003988>',
                    gale: '<:gale:863938974144528414>',
                    jacky: '<:jacky:863938974131945502>',
                    lou: '<:lou:863938974821515285>',
                    max: '<:max:863938974246764594>',
                    mrp: '<:mrp:863938973772152903>',
                    ruff: '<:ruff:863938975446466570>',
                    sandy: '<:sandy:863938973462167583>',
                    sprout: '<a:sprout:863938984664629298>',
                    squeak: '<:squeak:863938974967660565>',
                    stu: '<:stu:863938973705699348>',
                    surge: '<:surge:863938973785260033>',
                    nani: '<:nani:864174924276563988>',
                }
                
                if(!args[1] || args[1] === '1'){
                    emojis.page = res.brawlers.slice(0, 25)
                    embed.setFooter('Page 1/2')
                } else if(args[1] === '2'){
                    emojis.page = res.brawlers.slice(25, res.brawlers.length)
                    embed.setFooter('Page 2/2')
                }

                await emojis.page.forEach(brawler => {
                    if(brawler.name === 'SHELLY'){
                        emojis.icon = emojis.shelly
                    } else if(brawler.name === 'COLT'){
                        emojis.icon = emojis.colt
                    } else if(brawler.name === 'BULL'){
                        emojis.icon = emojis.bull
                    } else if(brawler.name === 'BROCK'){
                        emojis.icon = emojis.brock
                    } else if(brawler.name === 'RICO'){
                        emojis.icon = emojis.rico
                    } else if(brawler.name === 'SPIKE'){
                        emojis.icon = emojis.spike
                    } else if(brawler.name === 'BARLEY'){
                        emojis.icon = emojis.barley
                    } else if(brawler.name === 'JESSIE'){
                        emojis.icon = emojis.jessie
                    } else if(brawler.name === 'NITA'){
                        emojis.icon = emojis.nita
                    } else if(brawler.name === 'DYNAMIKE'){
                        emojis.icon = emojis.dyna
                    } else if(brawler.name === 'EL PRIMO'){
                        emojis.icon = emojis.elprimo
                    } else if(brawler.name === 'MORTIS'){
                        emojis.icon = emojis.mortis
                    } else if(brawler.name === 'CROW'){
                        emojis.icon = emojis.crow
                    } else if(brawler.name === 'POCO'){
                        emojis.icon = emojis.poco
                    } else if(brawler.name === 'BO'){
                        emojis.icon = emojis.bo
                    } else if(brawler.name === 'PIPER'){
                        emojis.icon = emojis.piper
                    } else if(brawler.name === 'PAM'){
                        emojis.icon = emojis.pam
                    } else if(brawler.name === 'TARA'){
                        emojis.icon = emojis.tara
                    } else if(brawler.name === 'DARRYL'){
                        emojis.icon = emojis.darrly
                    } else if(brawler.name === 'PENNY'){
                        emojis.icon = emojis.penny
                    } else if(brawler.name === 'FRANK'){
                        emojis.icon = emojis.frank
                    } else if(brawler.name === 'GENE'){
                        emojis.icon = emojis.gene
                    } else if(brawler.name === 'TICK'){
                        emojis.icon = emojis.tick
                    } else if(brawler.name === 'LEON'){
                        emojis.icon = emojis.leon
                    } else if(brawler.name === '8-BIT'){
                        emojis.icon = emojis.eightbit
                    } else if(brawler.name === 'AMBER'){
                        emojis.icon = emojis.amber
                    } else if(brawler.name === 'BEA'){
                        emojis.icon = emojis.bea
                    } else if(brawler.name === 'BELLE'){
                        emojis.icon = emojis.belle
                    } else if(brawler.name === 'BIBI'){
                        emojis.icon = emojis.bibi
                    } else if(brawler.name === 'BUZZ'){
                        emojis.icon = emojis.buzz
                    } else if(brawler.name === 'BYRON'){
                        emojis.icon = emojis.byron
                    } else if(brawler.name === 'CARL'){
                        emojis.icon = emojis.carl
                    } else if(brawler.name === 'COLETTE'){
                        emojis.icon = emojis.collette
                    } else if(brawler.name === 'EDGAR'){
                        emojis.icon = emojis.edgar
                    } else if(brawler.name === 'EMZ'){
                        emojis.icon = emojis.emz
                    } else if(brawler.name === 'GALE'){
                        emojis.icon = emojis.gale
                    } else if(brawler.name === 'JACKY'){
                        emojis.icon = emojis.jacky
                    } else if(brawler.name === 'LOU'){
                        emojis.icon = emojis.lou
                    } else if(brawler.name === 'MAX'){
                        emojis.icon = emojis.max
                    } else if(brawler.name === 'MR. P'){
                        emojis.icon = emojis.mrp
                    } else if(brawler.name === 'COLONEL RUFFS'){
                        emojis.icon = emojis.ruff
                    } else if(brawler.name === 'SANDY'){
                        emojis.icon = emojis.sandy
                    } else if(brawler.name === 'SPROUT'){
                        emojis.icon = emojis.sprout
                    } else if(brawler.name === 'SQUEAK'){
                        emojis.icon = emojis.squeak
                    } else if(brawler.name === 'STU'){
                        emojis.icon = emojis.stu
                    } else if(brawler.name === 'SURGE'){
                        emojis.icon = emojis.surge
                    } else if(brawler.name === 'ROSA'){
                        emojis.icon = emojis.rosa
                    } else if(brawler.name === 'NANI'){
                        emojis.icon = emojis.nani
                    }

                    if(brawler.rank < 5){
                        emojis.hrank = '<:rank_1:864165699694100543>'
                    } else if(brawler.rank < 10){
                        emojis.hrank = '<:rank_5:864165699735781396>'
                    } else if(brawler.rank < 15){
                        emojis.hrank = '<:rank_10:864165699810099251>'
                    } else if(brawler.rank < 20){
                        emojis.hrank = '<:rank_15:864165699823337522>'
                    } else if(brawler.rank < 25){
                        emojis.hrank = '<:rank_20:864165699522134029>'
                    } else if(brawler.rank < 30){
                        emojis.hrank = '<:rank_25:864165699885727755>'
                    } else if(brawler.rank < 35){
                        emojis.hrank = '<:rank_30:864165699944841276>'
                    } else if(brawler.rank > 35){
                        emojis.hrank = '<:rank_35:864165699765403719>'
                    }

                    if(brawler.power < 10){
                        emojis.levelsp = emojis.powerpoint
                    } else if(brawler.power === 10){
                        emojis.levelsp = '<:sp:864258881869840444>'
                    }
                    


                    embed.addField(`${emojis.icon} ${brawler.name}`, 
                                    `<:brawltrophy:863837978865696789> \`${brawler.trophies}\`**/**\`${brawler.highestTrophies}\` ${emojis.hrank}
                                    ${emojis.levelsp} ${brawler.power}
                                    `,
                                     true)
                })

                message.channel.send({ embeds: [embed] });


            })
        }
        else if(cmd === 'events'){

            fetch(`https://api.brawlstars.com/v1/events/rotation`, {
                method: "GET",
                headers: {"Accept": "application/json" ,"authorization": `Bearer ${BS_API_KEY}`}
            }).then(response => response.json()).then(async res => {
                if(res.reason === `accessDenied.invalidIp`){
                    const embed = new Discord.MessageEmbed()
                    .setAuthor(`There a problem with Brawl Stars API please contact with bot owner!`, message.author.displayAvatarURL({dynamic: true}))
                    return message.channel.send({ embeds: [embed] });
                }


                let embed = new Discord.MessageEmbed()
                .setTitle(`Current Events`)
                .setFooter('Date formats is based UTC')

                

                let gamemodes = {
                    name: null,
                    icon: null
                }

                await res.forEach(events => {
                    const year = events.endTime.slice(0, 4)
                    const month = events.endTime.slice(4, 6)
                    const day = events.endTime.slice(6, 8)
                    const hour = events.endTime.slice(9, 11)
                    const minute = events.endTime.slice(11, 13)

                    const date = `${month}/${day}/${year} at ${hour}:${minute}`
                    console.log(events)

                    if(events.event.mode === 'gemGrab'){
                        gamemodes.name = 'Gem Grab'
                        gamemodes.icon = '<:gemgrab:864196926919540806>'
                    } else if(events.event.mode === 'soloShowdown'){
                        gamemodes.name = 'Solo Showdown'
                        gamemodes.icon = '<:showdown_solo:863837979474657280>'
                    } else if(events.event.mode === 'brawlBall'){
                        gamemodes.name = 'Brawl Ball'
                        gamemodes.icon = '<:brawlball:864196926341644320>'
                    } else if(events.event.mode === 'hotZone'){
                        gamemodes.name = 'Hot Zone'
                        gamemodes.icon = '<:hotzone:864196926831591455>'
                    } else if(events.event.mode === 'duoShowdown'){
                        gamemodes.name = 'Duo Showdown'
                        gamemodes.icon = '<:showdown_duo:863837978870546442>'
                    } else if(events.event.mode === 'knockout'){
                        gamemodes.name = 'Knockout'
                        gamemodes.icon = '<:knockout:864193077701771284>'
                    } else if(events.event.mode === 'bigGame'){
                        gamemodes.name = 'Big Game'
                        gamemodes.icon = '<:biggame:864196926369693716>'
                    } else if(events.event.mode === 'volleyBrawl'){
                        gamemodes.name = 'Volley Brawl'
                        gamemodes.icon = '<:volleybrawl:864194494878842890>'
                    } else if(events.event.mode === 'basketBrawl'){
                        gamemodes.name = 'Basket Brawl'
                        gamemodes.icon = '<:basketbrawl:864194494256775179>'
                    } else if(events.event.mode === 'bounty'){
                        gamemodes.name = 'Bounty'
                        gamemodes.icon = '<:bounty:864196926504697856>'
                    } else if(events.event.mode === 'heist'){
                        gamemodes.name = 'Heist'
                        gamemodes.icon = '<:heist:864196927163072572>'
                    }


                    embed.addField(`${gamemodes.icon} ${gamemodes.name}`,
                        `**${events.event.map}**\n
                        **${date}**`, true)
                })

                message.channel.send({ embeds: [embed] })
            })
        }
        else if(cmd === 'club'){
            if(!args[0]){
                const embed = new Discord.MessageEmbed()
                .setAuthor(`You need to specify somethings for club!`, message.author.displayAvatarURL({dynamic: true}))
                .addField(`Usage`, `${PREFIX}club <brawl stars club tag>`, true)
                .addField(`Need help?`, `${PREFIX}help brawlstats`, true)
                return message.channel.send({ embeds: [embed] });
            }
            let clubtag;
            if(args[0].startsWith('#')) clubtag = args[0].slice(1, args[0].length)
            else clubtag = args[0]
    
            fetch(`https://api.brawlstars.com/v1/clubs/%23${clubtag}`, {
                method: "GET",
                headers: {"Accept": "application/json" ,"authorization": `Bearer ${BS_API_KEY}`}
            }).then(response => response.json()).then(async res => {
    
                if(res.reason === `notFound`){
                    const embed = new Discord.MessageEmbed()
                    .setAuthor(`There is no Brawl Stars Club with ${clubtag} tag!`, message.author.displayAvatarURL({dynamic: true}))
                    return message.channel.send({ embeds: [embed] });
                }
                if(res.reason === `accessDenied.invalidIp`){
                    const embed = new Discord.MessageEmbed()
                    .setAuthor(`There a problem with Brawl Stars API please contact with bot owner!`, message.author.displayAvatarURL({dynamic: true}))
                    return message.channel.send({ embeds: [embed] });
                }

                const badge = 'https://cdn.brawlstats.com/club-badges/clan_badge_04_04.png'

                let guild = {
                    type: null,
                    typeico: null,
                    clubmember: null,
                    memberrank: 1,
                    memberpage: null,
                }

                if(res.type === 'open'){
                    guild.type = 'Open'
                    guild.typeico = '<:opened:864216024193957918>'
                } else if(res.type === 'inviteOnly'){
                    guild.type = 'Invite Only'
                    guild.typeico = '<:inviteonly:864216026836238416>'
                } else if(res.type === 'closed'){
                    guild.type = 'Closed'
                    guild.typeico = '<:closed:864216023967989792>'
                }


                const embed = new Discord.MessageEmbed()
                .setAuthor(`${res.name} • ${res.tag}`)
                .setThumbnail(`${badge}`)
                .setDescription(`${res.description}`)
                .addField(`${guild.typeico} Type`, `${guild.type}`, true)
                .addField(`<:tag:863842838869442591> Required Trophies`, `${res.requiredTrophies}`, true)
                .addField(`<:brawltrophy:863837978865696789> Total Trophies`, `${res.trophies}`, true)
                .addField('\u200B', '**Club Members**')
                
                if(!args[1] || args[1] === '1'){
                    guild.memberpage = res.members.slice(0, 15)
                    guild.memberrank = 1
                } else if(args[1] === '2'){
                    guild.memberpage = res.members.slice(15, 30)
                    guild.memberrank = 16
                } else if(args[1] === '3'){
                    guild.memberpage = res.members.slice(30, 45)
                    guild.memberrank = 30
                } else if(args[1] === '4'){
                    guild.memberpage = res.members.slice(45, 60)
                    guild.memberrank = 46
                } else if(args[1] === '5'){
                    guild.memberpage = res.members.slice(60, 75)
                    guild.memberrank = 60
                } else if(args[1] === '6'){
                    guild.memberpage = res.members.slice(75, 90)
                    guild.memberrank = 75
                } else if(args[1] === '7'){
                    guild.memberpage = res.members.slice(90, 100)
                    guild.memberrank = 90
                } else if(args[1] > 7){
                    const embed = new Discord.MessageEmbed()
                    .setDescription(`**Hey did you noticed clubs can have most 100 members?**`)
                    return message.channel.send({ embeds: [embed] });
                }
                

                await guild.memberpage.forEach((member) => {

                    if(member.role === 'member'){
                        guild.clubmember = ':white_small_square: Member'
                    } else if(member.role === 'senior'){
                        guild.clubmember = '**✨ Senior**'
                    } else if(member.role === 'vicePresident'){
                        guild.clubmember = '**⭐ Vice President**'
                    } else if(member.role === 'president'){
                        guild.clubmember = '**🔱 President**'
                    }

                    embed.addField(`${guild.memberrank++} • ${member.name}`,
                    `<:brawltrophy:863837978865696789> ${member.trophies}\n${guild.clubmember}`, true)
                })
                
                message.channel.send({ embeds: [embed] });

            })

        }
        else if(cmd === 'leaderboards' || cmd === 'leaderboard'){
            if(!args[0]){

                const embed = new Discord.MessageEmbed()
                .setAuthor(`You need to specify a leaderboard type!`, message.author.displayAvatarURL({dynamic: true}))
                .addField(`Global Players`, `${PREFIX}leaderboards players`, true)
                .addField(`Global Clubs`, `${PREFIX}leaderboards clubs`, true)
                return message.channel.send({ embeds: [embed] });

            } else if(args[0] === 'players'){

                fetch(`https://api.brawlstars.com/v1/rankings/global/players?limit=50`, {
                method: "GET",
                headers: {"Accept": "application/json" ,"authorization": `Bearer ${BS_API_KEY}`}
            }).then(response => response.json()).then(async res => {

                if(res.reason === `accessDenied.invalidIp`){
                    const embed = new Discord.MessageEmbed()
                    .setAuthor(`There a problem with Brawl Stars API please contact with bot owner!`, message.author.displayAvatarURL({dynamic: true}))
                    return message.channel.send({ embeds: [embed] });
                }
    
                let memberrank = 1

                const embed = new Discord.MessageEmbed()
                .setAuthor(`Top Players In Global`)

                
                const forpage = res.items.slice(0, 25)
                
                forpage.forEach(user => {
                    embed.addField(`${memberrank++} • ${user.name}`, 
                    `<:brawltrophy:863837978865696789> ${user.trophies}`, 
                    true)
                })

                message.channel.send({ embeds: [embed] });

            })
            } else if(args[0] === 'clubs'){

                fetch(`https://api.brawlstars.com/v1/rankings/global/clubs?limit=25`, {
                method: "GET",
                headers: {"Accept": "application/json" ,"authorization": `Bearer ${BS_API_KEY}`}
            }).then(response => response.json()).then(async res => {

                if(res.reason === `accessDenied.invalidIp`){
                    const embed = new Discord.MessageEmbed()
                    .setAuthor(`There a problem with Brawl Stars API please contact with bot owner!`, message.author.displayAvatarURL({dynamic: true}))
                    return message.channel.send({ embeds: [embed] });
                }
    
                let clubrank = 1

                const embed = new Discord.MessageEmbed()
                .setAuthor(`Top Clubs In Global`)

                
                const forclub = res.items.slice(0, 25)
                
                forclub.forEach(club => {
                    embed.addField(`${club.rank} • ${club.name}`, 
                    `<:brawltrophy:863837978865696789> ${club.trophies}
                    <:online:864256296152596480> \`${club.memberCount}\`**/**\`100\``, 
                    true)
                })

                message.channel.send({ embeds: [embed] });

            })
            }
    }
}
}
    