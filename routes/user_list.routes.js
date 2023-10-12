module.exports = (app) => {
    const userListController = require('../controllers/user_list.controller');
    const { wrapAsync } = require('../utilities');
    app.get('/lists/email', wrapAsync(userListController.findListsByEmail));
    app.get('/lists/:listId', wrapAsync(userListController.findUserListById));
    app.put('/lists/:listId', wrapAsync(userListController.modifyUserList));
    app.post('/lists', wrapAsync(userListController.createUserList));
    app.delete('/lists/:listId', wrapAsync(userListController.deleteUserList));
}