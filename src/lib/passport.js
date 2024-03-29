const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../database");
const helpers = require("./helpers");

passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const rows = await pool.query(
        "SELECT * FROM users WHERE username = ? && superuser = 1",
        [username]
      );
      if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(
          password,
          user.password
        );
        if (validPassword) {
          done(null, user, req.flash("success", "Welcome " + user.username));
        } else {
          done(null, false, req.flash("message", "Contraseña incorrecta"));
        }
      } else {
        return done(null, false, req.flash("message", "El usuario no existe."));
      }
    }
  )
);

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const {
        companyname,
        companyrif,
        companyaddress,
        companyphone,
        companyemail,
        companylogo,
        products,
      } = req.body;
      let newUser = {
        username,
        password,
        companyname,
        companyrif,
        companyaddress,
        companyphone,
        companyemail,
        companylogo,
        products,
        idorder: 1,
      };
      newUser.password = await helpers.encryptPassword(password);
      // Saving in the Database
      const result = await pool.query("INSERT INTO users SET ? ", newUser);
      newUser.id = result.insertId;
      // return done(null, newUser);
      done(null);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  done(null, rows[0]);
});
