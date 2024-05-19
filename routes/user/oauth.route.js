const router = require('express').Router();
import { authenticate } from 'passport';
import { createUserToken } from "../utils/passport.auth";

router.get("/", authenticate("google", { scope: ["email", "profile"] }));

router.get("/callback", authenticate("google", {
    failureRedirect: "/login"
}), createUserToken);
router.get("/login",);

export default router;