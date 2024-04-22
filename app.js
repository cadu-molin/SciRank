const {Usuario} = require("./models")
const {init: initHandlebars} = require('./config/handlebars');
const express = require("express")
const app = express()

initHandlebars(app)
app.use(express.static("public"))

app.get("/", async function(req, res) {
    // const usuario = await Usuario.create({nome:"Carlos", email:"Teste@gamil.com", usuario:"Teste", senha: "123"})
    // res.json(usuario)
    res.render("home", {titulo: "Teste", layout: false})
})

app.listen(8081, function() {
    console.log("Subiu o servidor")
})