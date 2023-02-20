const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post(
  "/registrar/usuario",
  passport.authenticate("local.signup", {
    successRedirect: "/",
    failureRedirect: "/registrar/usuario",
    failureFlash: true,
  })
);

router.post("/signin", (req, res, next) => {
  passport.authenticate("local.signin", {
    successRedirect: "/",
    failureRedirect: "/",
    failureFlash: true,
  })(req, res, next);
});

router.get("/logout", (req, res, next) => {
  req.logOut(req.user, (err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = router;
