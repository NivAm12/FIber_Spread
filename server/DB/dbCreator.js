import { connect, connection } from 'mongoose';
import { readFileSync } from 'fs';
import { Address } from '../models/Address'

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
    const data = JSON.parse((readFileSync('israelStreets.json', 'UTF-8')));
    
    await data.forEach(
      async({cityCode, cityName, streetCode, streetName}) => {
        // create the object for the db:
          const addressObj = new Address({
            streetName: streetName,
            cityName: cityName,
            houseNumber: Math.floor(Math.random() * 10)
          });

        // insert the data to the db:
        await addressObj.save();
      }
    )
}

createDb();