const routes = require("./routers/route")
// const {init: initHandlebars} = require("./config/handlebars")
const handlebars = require('express-handlebars')
const middlewares = require('./middlewares/middlewares')
const express = require("express")
const app = express()
var session = require("express-session")

// initHandlebars(app)
app.use(express.static("public"))

app.use(session({
    secret: 'textosecreto$asdfasdfaswwww',
    cookie: { maxAge: 30 * 60 * 1000 }
}));

app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(middlewares.logRegister, middlewares.sessionControl)
app.use(routes);

app.use(
    express.urlencoded({
        extended: true
    })
)

app.listen(8081, function () {
    console.log("Servidor no http://localhost:8081")
});

// app.get("/", async function(req, res) {
//     res.render("home", {titulo: "Teste", layout: false})
// })