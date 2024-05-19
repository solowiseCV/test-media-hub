import User from "../../models/user/user.model.js";

export default class UserService {
    async findByEmail(email) {
        return await User.findOne({ email: email }, "-__v -password");
    }

    async findByEmailWithP(email) {
        return await User.findOne({ email: email }, "-__v");
    }

    async findOneByFilter(filter) {
        return await User.findOne(filter, "-__v -password");
    }

    async createUser(user) {
        const _user = await User.create(user);
        return await User.findOne({ _id: _user.id }, "-__v -password");
    }

    async findById(id) {
        return await User.findOne({ _id: id }, "-__v -password");
    }

    async findAllById(id) {
        return await User.findOne({ _id: id }, "-__v -password");
    }

    async getAllUsers() {
        let filter = {};
        //sorts in descending order based on the date created
        return await User.find(filter, "-__v -password").sort({ createdAt: 'desc' });
    }

    async editById(id, obj) {
        if (await User.findOne({ _id: id })) {
            return await User.findByIdAndUpdate(id, { $set: obj }, { new: true }).select("-password");
        }
    }

    async deleteById(id) {
        return await User.findByIdAndDelete(id);
    }
}