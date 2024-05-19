import bcrypt from "bcryptjs";
import UserService from "../../services/user/user.service.js";
import { generateAuthToken } from "../../utils/authToken.util.js";
import isObjectId from "../../utils/isValidObjectId.util.js";
import sendMail from "../../utils/sendmail.util.js";
import passwordReset from "../../utils/mailTemplates/resetPassword.js";
const {
    findByEmail,
    findByEmailWithP,
    createUser,
    findById,
    getAllUsers,
    editById,
    findOneByFilter,
    deleteById
} = new UserService();

export default class UserController {
    async createUser(req, res) {
        const { email, userName } = req.body;

        //checks if another user with email exists
        if (await findByEmail(email)) {
            //sends an error if the email exists
            return res.status(409)
                .send({
                    success: false,
                    message: "Email already exists"
                });
        }

        //creates a user if the email doesn't exist
        const createdUser = await createUser(req.body);
        const token = generateAuthToken(createdUser);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000
        });
        return res.status(201)
            .send({
                success: true,
                message: "User created successfully",
                createdUser
            });
    }

    async getUserById(req, res) {
        //checks if the Id passed in is a valid Id
        if (!isObjectId(req.params.userId)) {
            return res.status(404).send({
                success: false,
                message: "Id is not valid"
            });
        }

        //checks if user exists
        const user = await findById(req.params.userId);

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Id doesn not exist"
            });
        }
        return res.status(200).send({
            success: true,
            message: "User fetched successfully",
            user
        });
    }

    async getUsers(req, res) {
        const users = await getAllUsers();
        return res.status(200).send({
            success: true,
            message: "Users fetched successfully",
            users
        });
    }

    async editUserById(req, res) {
        const id = req.params.userId;
        const data = req.body;

        //checks if the Id passed in is a valid Id
        if (!isObjectId(id)) {
            return res.status(404).send({
                success: false,
                message: "Invalid Id"
            });
        }

        //use the id to check if the user exists
        const userToEdit = await findById(id);
        if (!userToEdit) {
            return res.status(404).send({
                success: false,
                message: "Id does not exist"
            })
        }

        //check if email already exist if the email needs to be updated
        if (data.email) {
            const userEmailWithEmail = await findByEmail(data.email)
            if (userEmailWithEmail) {
                if (userEmailWithEmail._id.toString() !== id) {
                    return res.status(403).send({
                        success: false,
                        message: "Email already exist"
                    })
                }
            }
        }

        // hash password if password needs to be updated
        if (data.password) {
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(data.password, salt);
        }

        const updatedUser = await editById(id, data);

        //regenerating token cuz user details was changed
        const token = generateAuthToken(updatedUser);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000
        });

        return res.status(200).send({
            success: true,
            message: "User updated successfully",
            editedUser: updatedUser
        })
    }

    async deleteById(req, res) {
        const id = req.params.userId;

        //checks if the Id passed in is a valid Id
        if (!isObjectId(id)) {
            return res.status(404).send({
                success: false,
                message: "Invalid Id"
            });
        }

        //check to see if a user with id exists
        const userToDelete = await findById(id);
        //deletes the user if the id exist
        if (userToDelete) {
            const userDeleted = await deleteById(id);
            //A user shouldn't have access to unauthenticated requests if the user deletes his/her account
            res.cookie("token", "", {
                httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000
            });

            if (userDeleted) {
                return res.status(200).send({
                    success: true,
                    message: "User deleted successfully"
                });
            }
        }

        //sends an error if the id doesn't exists
        return res.status(404)
            .send({
                success: false,
                message: "Id does not exist"
            });
    }

    async login(req, res) {
        const { email, password } = req.body;
        const _user = await findByEmailWithP(email);
        if (!_user) {
            return res.status(400)
                .send({
                    success: false,
                    message: "Invalid credentials"
                });
        }

        const validPassword = await bcrypt.compare(password, _user.password);
        if (!validPassword) {
            return res.status(400)
                .send({
                    success: false,
                    message: "Invalid credentials"
                });
        }
        const token = generateAuthToken(_user);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000
        });
        return res.status(200).send({
            success: true,
            message: "User successfully logged in",
            user: _user
        });
    }

    async logout(req, res) {
        res.cookie("token", '', {
            httpOnly: true, maxAge: 1
        });
        return res.status(200).send({
            success: true,
            message: "User logged out successfully"
        });
    }

    async sendResetLink(req, res) {
        const { email } = req.body;
        const _user = await findByEmail(email);
        if (!_user) {
            return res.status(404)
                .send({
                    success: false,
                    message: "Email not found"
                });
        }
        if (_user.email !== email) {
            return res.status(404)
                .send({
                    success: false,
                    message: "Invalid email"
                });
        }

        const token = [...Array(6)].map(() => Math.floor(Math.random() * 10)).join('');

        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        const updatedUser = await editById(_user._id, {
            resetToken: token,
            tokenExpiration: expiration
        });

        //Send Mail Method
        sendMail(passwordReset(updatedUser));
        return res.status(200).send({
            success: true,
            message: "Reset link sent successfully"
        });
    }

    async resetPassword(req, res) {
        const token = req.params.token;
        console.log(token)
        const user = await findOneByFilter({
            email: req.body.email,
            resetToken: token,
            // tokenExpiration: {
            //     $gte: Date.now()
            // }
        })
        console.log(user)
        if (!user) {
            return res.status(404)
                .send({
                    success: false,
                    message: "Invalid token"
                });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const updatedUser = await editById(String(user._id), { password: hashedPassword });

        // Generate JWT token
        const jwtToken = jwt.sign({
            _id: user._id,
            email: user.email,
            role: user.role
        }, process.env.SECRET, { expiresIn: (7 * 24 * 60 * 60) });

        // only return the needed fields of user
        res.cookie('token', jwtToken, { httpOnly: true, maxAge: (7 * 24 * 60 * 60 * 1000) }).status(200).send({
            message: 'Password reset successfully',
            success: true,
            data: updatedUser
        });
    }
}