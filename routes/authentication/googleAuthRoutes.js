import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
  "/login/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get(
  "/google-auth/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",
  }),
  function (req, res) {
    res.redirect("/success");
  }
);

router.get("/success", (req, res) => {
  console.log(req.user);
  res.send(`Welcome to Media Hub ${req.user.email}`);
});

router.get("/failed", (req, res) => {
  res.send("Failed to authenticate! Please try again");
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).send("Failed to logout!");
    }
    res.redirect("/");
  });
});

export default router;
