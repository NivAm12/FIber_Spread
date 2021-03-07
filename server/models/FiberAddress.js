const mongoose = require('mongoose');

// create the fiber address schema:
const fiberAddressSchema = new mongoose.Schema({
    streetName: {
        type: String
    },
    cityName: {
        type: String
    },
    houseNumber: {
        type: Number
    }
});

module.exports = mongoose.model('FiberAddress', fiberAddressSchema);