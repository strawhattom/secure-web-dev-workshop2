const filmingLocations = require('./lieux-de-tournage-a-paris.json');    // load locations
require('dotenv').config();                                             // load dotenv packages
const mongoose = require('mongoose');                                   // load mongoose


const getLocations = (locations) => {
    let _loc = []
    locations.forEach(element => {

        _loc.push({
            filmType:  element.fields.type_tournage,
            filmProducerName: element.fields.nom_producteur,
            endDate:   new Date(element.fields.date_fin),
            filmName:  element.fields.nom_tournage,
            district: element.fields.ardt_lieu,
            geolocation : {
                coordinates:element.fields.geo_shape.coordinates,
                type:element.fields.geo_shape.type
            },
            sourceLocationId : element.fields.id_lieu,
            filmDirectorName : element.fields.nom_realisateur,
            address : element.fields.adresse_lieu,
            startDate : new Date(element.fields.date_debut),
            year : element.fields.annee_tournage
        });
    })
    return _loc;
};

// Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {  
        console.log("[+] Connection is successfull");
    })
    .catch((e) => {
        console.log("[-] No connection ");
        console.error(e);
});

const Location = mongoose.model("Location", require("./schemas/locationSchema"));

const locations = getLocations(filmingLocations);

Location.insertMany([...locations]).then(() => {
    console.log("[*] Data inserted, total of " + locations.length);
}).catch((err) => {
    console.error(err);
});


// Queries

async function locationById(id) {
    return await Location.findOne({id:id});
}

async function locationByName(filmName){
    return await Location.find().where('filmName').equals(filmName);
}

async function deleteById(id) {
    return await Location.findOne({id:id});
}

async function addLocation(location) {
    return await Location.create(location);
}

/* TO DO */
async function updateLocation(id, newLocation){
    return;
}

mongoose.connection.close();