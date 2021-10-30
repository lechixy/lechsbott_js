require('./strategies/discord')

const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose')

const { MONGO_DB_SRV } = require('../commands/util/lechsbottUtil')

const app = express();
const port = process.env.PORT || 3001
const routes = require('./routes')

mongoose.connect(MONGO_DB_SRV).then(() => {
    console.log('Successfully connected to lechsbottdb')
}).catch((err) => {
    console.log(err)
})  

app.use('/api', routes)

app.use(passport.initialize())
app.use(passport.session())



app.listen(port, () => {
    console.log(`Listening to http://localhost:${port}/api/auth/discord on port ` + port)
})