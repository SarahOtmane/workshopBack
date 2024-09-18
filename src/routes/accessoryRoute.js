
module.exports = (server) => {
    const accessoryController = require('../controllers/accessoryController');

    server.post('/accessory', accessoryController.createAnAccessory);
}