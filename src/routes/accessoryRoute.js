
module.exports = (server) => {
    const accessoryController = require('../controllers/accessoryController');

    server.post('/accessories', accessoryController.createAnAccessory);
    server.get('/accessories', accessoryController.getAllAccessory);
    server.get('/accessories/:name', accessoryController.getAnAccessory);
}