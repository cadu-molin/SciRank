const handlebars = require("express-handlebars");

function init(app) {
  app.engine(
    "handlebars",
    handlebars.engine({
      defaultLayout: "main",
    })
  );

  app.set("view engine", "handlebars");
};

module.exports = {
  init,
}