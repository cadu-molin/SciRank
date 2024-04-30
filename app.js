require('dotenv').config()
const routes = require("./routers/Router")
const {init: handlebars} = require("./config/handlebars")
const middlewares = require('./middlewares/middlewares')
const express = require("express")
const app = express()
var session = require("express-session")

handlebars(app)
app.use(express.static("public"))

app.use(session({
    secret: 'textosecreto$asdfasdfaswwww',
    cookie: { maxAge: 30 * 60 * 1000 }
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    if(req.url == '/login') {
        return next()
    }
    if(!req.session.user?.idUsuario) {
        return res.redirect("/login")
    }
    next();
  });

app.use(routes);

app.use(
    express.urlencoded({
        extended: true
    })
)

app.listen(8081, function () {
    console.log("Servidor no http://localhost:8081")
});