const express = require("express");
const router = express.Router();

const Utilisateur = require("../../models/Utilisateurs.model");
const utilisateurSchema = require('../../helpers/utilisateur.validator')



router.put('/api/utilisateurs/:id_g/:id_u',async (req,res)=>{
    Utilisateur.findById(req.params.id_g)
    .then(async ( utilisateur ) => {
        if( utilisateur.type == "Gestionnaire"){
            await utilisateurSchema.validateAsync(req.body)
            .then((result)=>{
                Utilisateur.updateOne({ _id : req.params.id_u } , req.body )
                .then( ()=> {
                    res.status(200).send({
                        status : "OK",
                        message : "utilisateur modifié avec succès!",
                        details : result
                    });
                })
            }).catch((err)=>{
                res.send({
                    status : "ERROR",
                    message : err.details[0].message
                })
            })
        }else{
            res.status(400).send({
                status : "ERROR",
                message : "excusez moi vous etes pas un administrateur!"
            });
        }
    }).catch(()=>{
        res.status(400).send({
            status : "ERROR",
            message : "aucun compte corresponde!"
        });
    })
})


module.exports = router;