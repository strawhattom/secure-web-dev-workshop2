const { Schema } = require('mongoose');  

// Creation location schema
const locationSchema = new Schema({
    filmType:  String ,
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
    },
    { typeKey: '$type' }
);

module.exports = locationSchema;