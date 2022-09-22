require('dotenv').config();                 // load dotenv packages
const mongoose = require('mongoose');       // load mongoose
mongoose.connect(process.env.MONGO_URI)
    .then(() => {  
    console.log("[+] Connection is successfull");
    }).catch((e) => {
        console.log("[-] No connection ");
        console.error(e);
    });    

const { Schema } = mongoose;

const locations = new Schema({
    filmType:  String,
    filmProducerName: String,
    endDate:   Date,
    filmName:  String,
    district: String,
    geolocation : {
        coordinates: Array,
        type: String
    },
    sourceLocationId : String,
    filmDirectorName : String,
    address : String,
    startDate : Date,
    year : String
});

mongoose.connection.close();