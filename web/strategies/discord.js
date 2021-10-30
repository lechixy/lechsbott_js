const passport = require('passport')
const Strategy = require('passport-discord').Strategy
const User = require('../../models/userWeb')

let scopes = ['guilds', 'identify']

passport.serializeUser((user, done) => {
    done(null, user.discordId)
})

passport.deserializeUser(async (discordId, done) => {
    try {
        const user = await User.findOne({ discordId });
        return user ? done(null, user) : done(null, null)
    } catch (err) {
        console.log(err)
        done(err, null);
    }
})

passport.use(new Strategy({
    clientID: '753906874729889853',
    clientSecret: 'kWQg7hRfDmvAtbeFBJM1oF-FSPQEIYnw',
    callbackURL: '/api/auth/discord/redirect',
    scope: scopes,
}, async (accessToken, refreshToken, profile, cb) => {

    const { id, username, discriminator, avatar, guilds } = profile;

    console.log('camed to here')

    try {
        const findUser = await User.findOneAndUpdate({ discordId: id }, {
            discordId: id,
            discordTag: `${username}#${discriminator}`,
            avatar,
            guilds,
        }, { new: true })
    
        if(findUser){
            console.log('user was found on db')
            return db(null, findUser)
        } else {
            const newUser = User.create({
                discordId: id,
                discordTag: `${username}#${discriminator}`,
                avatar,
                guilds
            })
            return cb(null, newUser)
        }
    } catch (err) {
        console.log(err)
        return cb(err, null)
    }

}
))