require('dotenv').config();                                             // load dotenv packages
const filmingLocations = require('./lieux-de-tournage-a-paris.json')    // load locations
const mongoose = require('mongoose');                                   // load mongoose
const { Schema } = mongoose;

// Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {  
    console.log("[+] Connection is successfull");
    }).catch((e) => {
        console.log("[-] No connection ");
        console.error(e);
    });    

// Creation location schema
const locationSchema = new Schema({
    filmType:  String,
    filmProducerName: String,
    endDate:   Date,
    filmName:  String,
    district: String,
    geolocation : {
        coordinates: [Number],
        type: String
    },
    sourceLocationId : String,
    filmDirectorName : String,
    address : String,
    startDate : Date,
    year : String
});

const Location = mongoose.model('Location', locationSchema);

const importLocations = (locations) => {
    let _loc = []
    locations.forEach(element => {

        _loc.push({
            filmType:  element.fields.type_tournage,
            filmProducerName: element.fields.nom_producteur,
            endDate:   new Date(element.fields.date_fin),
            filmName:  element.fields.nom_tournage,
            district: element.fields.ardt_lieu,
            geolocation : element.fields.geo_shape,
            sourceLocationId : element.fields.id_lieu,
            filmDirectorName : element.fields.nom_realisateur,
            address : element.fields.adresse_lieu,
            startDate : new Date(element.fields.date_debut),
            year : element.fields.annee_tournage
        });
    })

    return _loc;
};

Location.insertMany(importLocations(filmingLocations), (err) => {
    // something occured
    console.error(err);
})

mongoose.connection.close();