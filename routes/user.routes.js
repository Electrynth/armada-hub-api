module.exports = (app) => {
    const userController = require('../controllers/user.controller');
    const { wrapAsync } = require('../utilities');
    app.get('/users', wrapAsync(userController.findUserByEmail));
    app.post('/users', wrapAsync(userController.createUser));
}