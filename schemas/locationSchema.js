const { Schema } = require('mongoose');  

// Creation location schema
const locationSchema = new Schema({
    filmType:  {String, required: false } ,
    filmProducerName: {String, required: false},
    endDate:   {Date, required: false},
    filmName:  {String, required: false},
    district: {String, required: false},
    geolocation : {
        coordinates: [Number],
        type: String,
        required: false
    },
    sourceLocationId : {String, required: false},
    filmDirectorName : {String, required: false},
    address : {String, required: false},
    startDate : {Date, required: false},
    year : {String, required: false}
    },
    { typeKey: '$type' }
);

module.exports = locationSchema;