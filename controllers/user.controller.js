const User = require('../models/user.model.js');

const findUserByEmail = async (req, res, next) => {
    try {
        const email = req.query.email;
        const foundUser = await User.findOne({ email });
        res.status(200).json(foundUser);
        next();
    } catch (e) {
        console.error(e.message);
        res.status(500).send({ message: e.message });
        next(e);
    }
}

const createUser = async (req, res, next) => {
    try {
        const email = req.body.email;
        const user = new User({ email });
        const createdUser = await user.save();

        res.status(200).json(createdUser);
        next();
    } catch (e) {
        console.error(e.message);
        res.status(500).send({ message: e.message });
        next(e)
    }
}

module.exports = {
    findUserByEmail,
    createUser
};