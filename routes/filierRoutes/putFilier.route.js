const express = require("express");
const router = express.Router();

const Filier = require("../../models/Filier.model");
const Utilisateur = require("../../models/Utilisateur.model");
const filierSchema = require('../../helpers/filier.validator')

router.put('/api/filiers/:id_admin/:id_filier',(req,res)=>{
    Utilisateur.findById(req.params.id_admin)
    .then( ( utilisateur ) => {
        if( utilisateur.type == "Gestionnaire"){
             filierSchema.validateAsync(req.body)
            .then((result)=>{
                Filier.updateOne({ _id : req.params.id_filier } , req.body )
                .then( ()=> {
                    res.status(200).send({
                        status : "OK",
                        message : "filiers modifié avec succès!",
                        details : result
                    });
                })
            })
            .catch((err)=>{
                res.send({
                    status : "ERROR",
                    message : err.details[0].message
                })
            })
        }else{
            res.send({
                status : "ERROR",
                message : "excusez moi vous etes pas un administrateur!"
            });
        }})
    .catch(()=>{
        res.send({
            status : "ERROR",
            message : "aucun compte corresponde!"
        });
    })
})



module.exports = router;