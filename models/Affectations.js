const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      mongoose_delete = require('mongoose-delete');

//create schemamodel
const AffictationsSchema = new Schema({
    email : String,
    code_groupe : String,
},{ timestamps: true })

AffictationsSchema.plugin(mongoose_delete);

const Affectation = mongoose.model( "Affectation" , AffictationsSchema );

module.exports = Affectation;