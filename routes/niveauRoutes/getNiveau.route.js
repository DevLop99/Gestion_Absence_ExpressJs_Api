const express = require("express");
const router = express.Router();

const Niveau = require("../../models/Niveau.model");
const Utilisateur = require("../../models/Utilisateur.model");

router.get('/api/niveau/:id_admin/:id_niveau', (req, res) => {
    Utilisateur
        .findById(req.params.id_admin)
        .then(utilisateur => {
            if (utilisateur.type == "Gestionnaire") {
                Niveau
                    .findOne({ _id : req.params.id_niveau })
                    .then(niveau => {
                        if(niveau && niveau.deleted == false){
                            res.send({
                                status: "OK",
                                details: niveau,
                                message : "niveau trouvé avec succès!"
                            });

                        }else{
                            res.send({
                                status: "ERROR",
                                message:"aucun niveau corresponde!"
                            });
                        }
                        
                    })
                    .catch(error => {
                        res.send({
                            status: "ERROR",
                            details: error,
                            message :"error lors de vérification de niveaux!"

                        })
                    })
            }
        }).catch(error => {
            res.send({
                status: "ERROR",
                details: "Error lors la vérifications d'utilisateur!"
            })
        })
});

module.exports = router;