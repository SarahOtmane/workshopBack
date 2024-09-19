const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/userModel');

const jwtMiddleware = require('../middelwares/jwtMiddleware');



/*
    loginAUser :

    Fonction qui permet à une personne de se connecter à son compte user

    Elle prend en entrée : Un email et un mot de passe ${email} , ${password}

    Les vérifications : 
        - Vérifier que l'utilisateur existe dans la base de donnée
        - Vérifier que le mot de passe fournis est le bon


    Reponses: 
        201 : connexion au compte user. 
            la fonction retourne le token user: ${token} 
        401 : Accès refusé : Mot de passe incorrect
        404 : Utilisateur non trouvé
        500 : Erreur lors du traitement de donnée
*/
exports.loginAUser = async(req, res) =>{
    try {
        const user = await User.findOne({email: req.body.email});

        if(!user){
            res.status(404).json({message: "Email ou password incorrect"});
            return;
        }else{
            const passwordMatch = await argon2.verify(user.password, req.body.password);

            if(user.email == req.body.email && passwordMatch){
                const userData = {
                    email: user.email
                }

                const token = await jwt.sign(userData, process.env.JWT_KEY, {expiresIn: '20h'});
                res.status(201).json({token});
            }else{
                res.status(401).json({message: 'Email ou password incorrect'});
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Une erreur s\'est produite lors du traitement'});
    }
}