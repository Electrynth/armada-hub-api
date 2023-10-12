const UserList = require('../models/user_list.model.js');
const IdCounter = require('../models/id_counter.model.js');

const findUserListById = async (req, res, next) => {
    try {
        const listId = req.params.listId;
        const foundList = await UserList.findOne({ listId });
        res.status(200).json(foundList);
        next();
    } catch (e) {
        console.error(e.message);
        res.status(500).send({ message: e.message });
        next(e);
    }
}

const findListsByEmail = async (req, res, next) => {
    try {
        const email = req.query.email;
        const foundLists = await UserList.find({ email: email }, { title: 1, listId: 1, points: 1, faction: 1 });
        res.status(200).json(foundLists)
    } catch (e) {
        console.error(e.message);
        res.status(500).send({ message: e.message });
        next(e);
    }
}

const modifyUserList = async (req, res, next) => {
    try {
        const listId = req.params.listId;
        const updatedList = await UserList.findOneAndUpdate({ listId }, {
            ...req.body
        }, { returnOriginal: false });
        res.status(200).json(updatedList);
        next();
    } catch (e) {
        console.error(e.message);
        res.status(500).send({ message: e.message });
        next(e)
    }
}

const deleteUserList = async (req, res, next) => {
    try {
        const listId = req.params.listId;
        const deletedList = await UserList.deleteOne({ listId });
        if (deletedList.acknowledged) res.status(200).send({ deleted: true });
        else res.status(500).json(deletedList);
        next();
    } catch (e) {
        console.error(e.message);
        res.status(500).send({ message: e.message });
        next(e)
    }
}

const createUserList = async (req, res, next) => {
    try {
        const idCounters = await IdCounter.find({ collectionName: 'user_lists' });
        const idCounter = idCounters[0];
        const userList = new UserList({
            ...req.body,
            title: req.body.title === '' ? 'Untitled' : req.body.title,
            listId: idCounter.count
        });
        const createdUserList = await userList.save();
        idCounter.count += 1;
        idCounter.save();

        res.status(200).json(createdUserList);
        next();
    } catch (e) {
        console.error(e.message);
        res.status(500).send({ message: e.message });
        next(e)
    }
}

module.exports = {
    findListsByEmail,
    findUserListById,
    modifyUserList,
    createUserList,
    deleteUserList
};