import mongoose from 'mongoose'
const { connect, connection } = mongoose
import { readFileSync } from 'fs'
import { FiberAddress } from '../models/FiberAddress.js'

const connectToDB = () =>{
  connect('mongodb://localhost:27017/fiberSpread', {
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      useCreateIndex: true,
      useFindAndModify: false,

    });
    const db = connection;
    db.on("error", console.error.bind(console, "connection error"));
    db.once("open", () => {
      console.log("Database connected");
    })
}

const createDb = async() => {
    connectToDB();
    
    // load the json data:
    const data = JSON.parse((readFileSync('fiber_data.json', 'UTF-8')));
    
    await data.forEach(
      async({street_name, city_name, house_number}) => {
        // create the object for the db:
          let addressObj = new FiberAddress({
            streetName: street_name,
            cityName: city_name,
            houseNumber: house_number
          });

        // insert the data to the db:
        await addressObj.save();
      }
    )
}

createDb();