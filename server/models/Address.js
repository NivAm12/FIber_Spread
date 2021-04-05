import mongoose from 'mongoose';
import Joi from 'joi';

const {Schema, model} = mongoose;

// create the fiber address schema:
const addressSchema = new Schema({
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

const Address = new model('Address', addressSchema);

const addressValidation = (fiberAdress) => {
    // joi schema:
    const schema = Joi.object({
        streetName: Joi.string().required(),
        cityName: Joi.string().required(),
        houseNumber: Joi.number()
    });

    // validation:
    return schema.validate();
}

export {Address, addressValidation};