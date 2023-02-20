const express = require("express");
const { engine } = require("express-handlebars");
const MySQLStore = require("express-mysql-session");
const session = require("express-session");
// LEER ARCHIVO CON CADA GUARDADA
const morgan = require("morgan");
// MENSAJES AL USUARIO CONNECT FLASH
const flash = require("connect-flash");
// KEYS DATABASE
const { database } = require("./keys");
// LIBRERIA DIRECCIONES
const path = require("path");
// AUTENTICACION
const passport = require("passport");
require("./lib/passport");
// CROSS ORIGIN PARA AXIOS
var cors = require("cors");
// CROSS ORIGIN PARA AXIOS
// CONFIGURACION .ENV
const { config } = require("dotenv");
config();
// CONFIGURACION .ENV
// INICIALIZACIONES
const app = express();
// CONFIGURACIONES
app.set("port", process.env.SERVER_PORT || process.env.SERVER_PORT_LOCAL_HOST);

// CONFIGURACION MOTOR DE PLANTILLAS HTML
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars.js"),
  })
);
app.set("view engine", ".hbs");
// MIDDLEWARES;
app.use(
  session({
    secret: "sessionMySql",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database),
  })
);
app.use(cors());
app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
// VARIABLES GLOBALES
app.use((req, res, next) => {
  app.locals.success = req.flash("success");
  app.locals.message = req.flash("message");
  app.locals.user = req.user;
  next();
});
// ROUTES
app.use(require("./routes"));
app.use(require("./routes/authentication"));
app.use(require("./routes/pedidos"));
app.use(require("./routes/api_pedidos"));
app.use(require("./routes/products"));
app.use(require("./routes/usuarios"));
// PUBLIC
app.use(express.static(path.join(__dirname, "public")));
// INICIAR EL SERVIDOR
app.listen(app.get("port"), () => {
  console.log(`Servidor en puerto ${app.get("port")}`);
});
