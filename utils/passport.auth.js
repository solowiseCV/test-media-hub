import { generateAuthToken } from "../services/user.services";

export async function createUserToken(req, res) {
    // Successful authentication, redirect home.
    const token = generateAuthToken(req.user);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/api/v1/protected");
}