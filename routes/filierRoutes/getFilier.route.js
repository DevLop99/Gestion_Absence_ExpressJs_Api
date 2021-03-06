const express = require("express");
const router = express.Router();

const Filier = require("../../models/Filier.model");
const Utilisateur = require("../../models/Utilisateur.model");


router.get('/api/filier/:id_admin/:id_filier', (req, res) => {
    Utilisateur.findById(req.params.id_admin)
        .then((utilisateur) => {
            if (utilisateur.type == "Gestionnaire") {
                Filier
                    .findOne({ _id : req.params.id_filier})
                    .populate('niveau')
                    .then((filier) => {
                        if(filier.deleted == false){
                            res.send({
                                status: "OK",
                                details: {
                                    "_id": filier._id,
                                    "designation": filier.designation,
                                    "niveau": filier.niveau.designation,
                                    "idniveau": filier.niveau._id,
                                }
                            });
                        }else{
                            res.send({
                                status: "ERROR",
                                message:"Filier introuvable!!"
                                
                            });
                        }
                    }).catch((err) => {
                        res.send({
                            status: "ERROR",
                            message: 'error lors de chercher les filiers'
                        });
                    })
            }
            else {
                res.send({
                    status: "ERROR",
                    message: "excusez moi vous etes pas un administrateur!"
                });
            }
        }).catch(() => {
            res.send({
                status: "ERROR",
                message: "aucun compte corresponde!"
            });
        })
});

module.exports = router;