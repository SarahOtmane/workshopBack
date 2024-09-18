
const Accessory = require('../models/accessoryModel');


exports.createAnAccessory = async(req, res) =>{
    try {
        const {name, options, price} = req.body;
        if(!name && !options && !price){
            res.status(403).json({message: "L'un des champs est vide !"});
            return
        }

        const accessory = await Accessory.findOne({name: name});
        if(accessory){
            res.status(403).json({message: "Vous avez déja créer cet accessoire !"});
            return;
        }

        const newAccessory = new Accessory({
            name: name,
            options: options,
            prie : price
        });
        try {
            await newAccessory.save();
            res.status(201).json({message: "Accessoire créé avec succès"});
        } catch (error) {
            res.status(500).json({message: 'Une erreur s\'est produite lors du traitement'});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Une erreur s\'est produite lors du traitement'});
    }
}


exports.getAllAccessory = async(req, res) =>{
    try {
        const accessories = await Accessory.find();
        if(!accessories){
            res.status(404).json({message: 'Acce'});
            return;
        }
        res.status(200).json(accessories);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Une erreur s\'est produite lors du traitement'});
    }
}