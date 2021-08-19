const profileModel = require('../../models/profileSchema')

module.exports = async (Discord, client, member) => {
    let profile = await profileModel.create({
        userID: member.id,
        serverID: member.guild.id,
        coins: 1000,
        bank: 0
    })

    profile.save()

}