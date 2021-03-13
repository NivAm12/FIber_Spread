import { connect, connection } from 'mongoose';
import { readFileSync } from 'fs';
import { FiberAddress } from '../models/FiberAddress';

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
    const fiberData = JSON.parse((readFileSync('fiber_data.json', 'UTF-8')));
    
    await fiberData.forEach(
      async({street_name, house_number, city_name}) => {
        // create the object for the db:
          const fiberAddressObj = new FiberAddress({
            streetName: street_name,
            cityName: city_name,
            houseNumber: house_number});

        // insert the data to the db:
        await fiberAddressObj.save();
      }
    )
}

createDb();