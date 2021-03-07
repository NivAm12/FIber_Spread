const {Schema, model} = require('mongoose');

// create the fiber address schema:
const fiberAddressSchema = new Schema({
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

// create the model:
const FiberAddress = model('FiberAddress', fiberAddressSchema);

exports.FiberAddress = FiberAddress;