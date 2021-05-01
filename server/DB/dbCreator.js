import mongoose from 'mongoose';
import { FiberAddress } from '../models/FiberAddress.js';
import { spawn } from 'child_process';
const { connection, connect } = mongoose;


const connectToDb = () => {
    connect("mongodb://localhost:27017/fiberSpread", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    const db = connection;
    db.on("error", console.error.bind(console, "connection error"));
    db.once("open", () => {
      console.log("Database connected");
    });
  }

const createDb = async()=> {
    try{   
        connectToDb();
        const address = await FiberAddress.find();
        const {cityName, streetName, houseNumber} = address[120];
        console.log(address[120])
        
        const scrapeScript = spawn('python', ['../scrape/fiberAddressSearch.py', cityName, streetName, houseNumber]);

        scrapeScript.stdout.on("data", (result) => {
            console.log(JSON.parse(result));
          }); 
    }
    catch(e){
        console.log("on error: " + e.toString());
    }
}  


createDb();


