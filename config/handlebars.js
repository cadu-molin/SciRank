const handlebars = require("express-handlebars");

exports.init = function (app) {
  app.engine(
    "handlebars",
    handlebars.engine({
      defaultLayout: "main",
    })
  );

  app.set("view engine", "handlebars");
};