const filmingLocations = require('./lieux-de-tournage-a-paris.json');    // load locations
require('dotenv').config();                                             // load dotenv packages
const mongoose = require('mongoose');                                   // load mongoose

// Connection
try {
    mongoose.connect(process.env.MONGO_ROOT_URI);
    
    console.log("[+] Connection is successfull");
 
} catch (e) {
    console.log("[-] No connection ");
    console.error(e);
}

const Location = mongoose.model("Location", require("./schemas/locationSchema"));

// Queries

async function locationById(id) {
    Location.findOne({id:id}).then(response => {
        console.log(response);
    });
}

async function locationByName(filmName){
    Location.find().where('filmName').equals(filmName).then(response => {
        if (response) {
            for (const location of response) {
                console.log(location);
            }
        }
    });
}

async function deleteById(id) {
    await Location.findOneAndDelete({id}, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Deleted location : ", docs);
        }
    });
}

async function addLocation(location) {
    await Location.create(location);
}

/* TO DO */
async function updateLocation(id, newProperty){
    await Location.findOneAndUpdate({id}, newProperty);
}

const getLocations = (locations) => {
    let _loc = []
    let count = 0;
    locations.forEach(element => {

        _loc.push({
            id:count,
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
        count++;
    })
    return _loc;
};

/*
const locations = getLocations(filmingLocations);

Location.insertMany(
    locations
).then(() => {
    console.log("[*] Data inserted, total of " + locations.length);
    console.log("[*] Closing connection");
    mongoose.connection.close();
}).catch((e) => {
    console.log(e);
    mongoose.connection.close();
});
*/

// locationById(0);
locationByName("TOUT S'EST BIEN PASSE");
mongoose.connection.close();