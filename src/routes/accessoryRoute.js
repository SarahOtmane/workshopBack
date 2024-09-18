
module.exports = (server) => {
    const aessoryController = require('../controllers/acessoryController');

    server.post('/accessory', aessoryController.createAnAccessory);
}