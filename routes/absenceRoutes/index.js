const getabsence  = require("./getAbsence.route");
const postabsence = require("./postAbsence.route");
const putabsencebyFormateur = require("./putAbsenceByFormateur.route");
const putabsencebyAdmin = require("./putAbsenceByAdmin.route");
const deleteAbsenceByFormateur = require("./deleteAbsenceByFormateur.route");

const routes = [ getabsence , postabsence , putabsencebyFormateur , deleteAbsenceByFormateur , putabsencebyAdmin ];

module.exports = routes;