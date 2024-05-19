import { Router } from "express";
const router = Router();
import UserController from '../../controllers/user/user.controller.js';
import authenticate from "../../middlewares/authentication/auth.middle.js";
import { validateEdit, validateSignIn, validateSignUp } from "../../middlewares/validator/validator.js";


const {
    createUser,
    getUserById,
    getUsers,
    editUserById,
    deleteById,
    login,
    logout,
    sendResetLink,
    resetPassword
} = new UserController();

//create a user or signup
router.post("/", validateSignUp, createUser);
//login a user
router.post("/login", validateSignIn, login);
//get a user with an id
router.get("/:userId", authenticate, getUserById);
//get users
router.get("/", authenticate, getUsers);
//edit any user details
router.patch("/:userId", authenticate, validateEdit, editUserById);
// delete user
router.delete("/:userId", authenticate, deleteById);
//logout a user or signup
router.post("/logout", authenticate, logout);
//send rest password link
router.put('/forgot-password', sendResetLink);
//reset password
router.put('/reset-password/:token', resetPassword);

export default router;