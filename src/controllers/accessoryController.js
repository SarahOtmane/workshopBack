
const Accessory = require('../models/accessoryModel');


exports.createAnAccessory = async(req, res) =>{
    try {
        const accessory = await Accessory.findOne({name: req.body.name});

        if(accessory){
            res.status(403).json({message: "Vous avez déja créer cet accessoire !"});
            return;
        }

        const newAccessory = new Accessory(req.body);
        res.status(201).json({newAccessory});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Une erreur s\'est produite lors du traitement'});
    }
}