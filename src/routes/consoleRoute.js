module.exports = (server) => {
    const consoleController = require('../controllers/consoleController');

    server.post('/consoles',jwtMiddleware.verifyToken, consoleController.loginAUser);
}