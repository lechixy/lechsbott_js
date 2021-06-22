module.exports = () => {

    const Sequelize = require('sequelize')

    const sequelize = new Sequelize('database', 'user', 'password', {
        host: 'localhost',
        dialect: 'sqlite',
        logging: false,
        storage: 'userdatabase.sqlite'
    })

    const Users = sequelize.define('users', {
        user_id: { type: Sequelize.STRING, unique: true, allowNull: false },
        user_infos: { type: Sequelize.JSON, defaultValue: { money: 10000 }}
    })
    
    return Users;
}