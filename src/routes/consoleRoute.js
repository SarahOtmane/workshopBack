module.exports = (server) => {
    const consoleController = require('../controllers/consoleController');

    server.post('/users/login',jwtMiddleware.verifyToken, consoleController.loginAUser);
}