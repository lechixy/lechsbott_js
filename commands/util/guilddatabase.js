module.exports = () => {

    const Sequelize = require('sequelize')

    const sequelize = new Sequelize('database', 'user', 'password', {
        host: 'localhost',
        dialect: 'sqlite',
        logging: false,
        storage: 'userdatabase.sqlite'
    })

    const Guilds = sequelize.define('guilds', {
        guild_id: { type: Sequelize.STRING, unique: true, allowNull: false },
        welcome_message: { type: Sequelize.JSON, defaultValue: { enabled: false, channel_id: "", message: ""} },
        twitch_data: {type: Sequelize.JSON, defaultValue: { d_channel_id: "", t_channel_name: "", enabled: false}},
    })
    return Guilds;
}