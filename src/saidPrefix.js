const said = require('../models/saidPrefix')

async function saidPrefix(message) {

    try {

        said.findOne({ userID: message.author.id }, async (err, data) => {
            if (err) throw err;

            if (data) {
                return await said.findOneAndUpdate({ userID: message.author.id }, { $inc: { timeSaid: 1 } })
            } else {
                return said.create({
                    userID: message.author.id,
                    timeSaid: 1
                })
            }

        })

    } catch (err) {
        return console.log(err)
    }
}

exports.saidPrefix = saidPrefix;