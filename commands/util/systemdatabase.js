module.exports = () => {

    const Sequelize = require('sequelize')

    const sequelize = new Sequelize('database', 'user', 'password', {
        host: 'localhost',
        dialect: 'sqlite',
        logging: false,
        storage: 'userdatabase.sqlite'
    })

    const d = new Date()
    const fulldate = `${d.getFullYear()}/${d.getMonth()}/${d.getDate()} at ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`

    const Users = sequelize.define('users', {
        user_id: { type: Sequelize.STRING, unique: true, allowNull: false },
        user_infos: { type: Sequelize.JSON, defaultValue: { 
            money: 10000, 
            createdAt: fulldate, 
            role: `Member`, 
            description: null, 
            badges: `<:userbadge:857764439226974218> New Kid`, 
            level: 100, 
            achi: `🔰 Beginner`,
            nick: null,
            bday: null
        }}
    })
    
    return Users;
}