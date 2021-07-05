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
        user_infos: { type: Sequelize.JSON, defaultValue: { money: 10000, createdAt: fulldate, role: `Member`, description: `lechixy1987`, badges: `<:userbadge:857764439226974218>`, level: 100, achi: `🔰 Beginner` }}
    })
    
    return Users;
}