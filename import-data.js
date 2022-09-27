const filmingLocations = require('./lieux-de-tournage-a-paris.json');    // load locations
require('dotenv').config();                                             // load dotenv packages
const mongoose = require('mongoose');                                   // load mongoose

// Queries

const Location = mongoose.model("Location", require("./schemas/locationSchema"));

async function locationById(id) {
    try {
        const response = await Location.findOne({_id:id});
        console.log(response);
    } catch (err) {
        console.log("Something occured while retrieving a location");
        console.log(err);
    }
}

async function locationByName(filmName){
    try {
        const response = await Location.find().where('filmName').equals(filmName);
        console.log(response);
    } catch (err) {
        console.log("Something occured while retrieving locations");
        console.log(err);
    }
}

async function deleteById(id) {
    await Location.findOneAndDelete({_id:id}, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Deleted location : ", docs);
        }
    });
}

async function addLocation(location) {
    try {
        await Location.create(location);
        console.log("Location added");
    } catch (err) {
        console.log("An error occured");
    }
    
}

async function updateLocation(id, newProperty){
    try {
        await Location.findOneAndUpdate({_id:id}, newProperty);
        console.log("Location updated ! ");

    } catch (err) {
        console.log("An error occured while updating a location...");

    }
}

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
mongoose.connect(process.env.MONGO_ROOT_URI).then((success) => {

    console.log("[+] Connection is successfull");

    /* IMPORT DATA
    const locations = getLocations(filmingLocations);
    Location.insertMany(
        locations
    ).then(() => {
        console.log("[*] Data inserted, total of " + locations.length);
        console.log("[*] Closing connection");
        mongoose.connection.close();
    */

    // locationById("63331783a53f0b578f7e6413");
    locationByName("TOUT S'EST BIEN PASSE");
    // addLocation({
    //     filmType:  "NOUVEAU FILM",
    //     filmProducerName: "NOUVEAU PRODUCTEUR",
    //     endDate:   "2022-02-02",
    //     filmName:  "NOM",
    //     district: "DISTRICT",
    //     geolocation : {
    //         coordinates:[3,3],
    //         type:"TYPE"
    //     },
    //     sourceLocationId : "LOCATIONID",
    //     filmDirectorName : "DIRECTOR",
    //     address : "ADDRESS",
    //     startDate : "2022-02-01",
    //     year : "2022"
    // });
    // updateLocation({_id:"6333222cae5c88a1eb7430e4"}, {filmName : "NOUVEAU NOM"});
    mongoose.connection.close();

}).catch((err) => {

    console.log("[-] No connection ");
    console.error(err);

});