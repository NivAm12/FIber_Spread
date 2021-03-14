import mongoose from 'mongoose';
import Joi from 'joi';

const {Schema, model} = mongoose;

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

const FiberAddress = new model('FiberAddress', fiberAddressSchema);

const fiberAddressValidation = (fiberAdress) => {
    // joi schema:
    const schema = Joi.object({
        streetName: Joi.string().required(),
        cityName: Joi.string().required(),
        houseNumber: Joi.number()
    });

    // validation:
    return schema.validate();
}

export {FiberAddress, fiberAddressValidation};