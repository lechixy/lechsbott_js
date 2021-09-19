function startWeb(){

  const http = require("http")
  const express = require("express")
  const app = express()
  const ejs = require('ejs')
  const settings = require("./settings.json")
  const server = http.createServer(app)

  app.set('view engine', 'ejs')
  app.use(express.static("public"))

  app.get("/", (req, res) => {
    res.render("index", { bot: settings.website })
  })

  app.get("/commands", (req, res) => {
    res.render("commands", { bot: settings.website })
  })

  app.all('*', (req, res) => res.render('errors/404'));

  
  const listener = server.listen(3000, '0.0.0.0', () => {
    const address = server.address();
    console.log('server listening at', address);
  });

}

exports.startWeb = startWeb
