import jwt from "jsonwebtoken";

//creates a json web token
export const generateAuthToken = (user) => {
    return jwt.sign({
        id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role
    }, "SECRET", {
        expiresIn: 3 * 24* 60 * 60
    });
};