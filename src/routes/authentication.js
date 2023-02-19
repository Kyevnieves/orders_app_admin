const express = require("express");
const router = express.Router();
const passport = require("passport");
const { isLoggedIn } = require("../lib/auth");

router.get("/signup", (req, res) => {
  if (req.user !== undefined) {
    res.redirect("/perfil");
  } else res.render("auth/signup");
});

router.post(
  "/signup",
  passport.authenticate("local.signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
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
router.get("/signin", (req, res) => {
  if (req.user !== undefined) {
    res.redirect("/profile");
  } else res.render("auth/signin");
});
router.get("/profile", (req, res) => {
  if (req.user === undefined) {
    res.redirect("/signin");
  } else res.render("profile");
});
router.get("/logout", (req, res, next) => {
  req.logOut(req.user, (err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});
module.exports = router;
