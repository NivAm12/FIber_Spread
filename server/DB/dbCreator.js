import mongoose from "mongoose";
import { FiberAddress } from "../models/FiberAddress.js";
import { AddressWithFibers } from "../models/AddressWithFibers.js";
import { spawnSync } from "child_process";
const { connection, connect } = mongoose;


const numberOfAddresses = 20;


const createDb = async () => {
  try {
    connectToDb();

    // get group of the cities:
    const citiesAddresses = await getAddresses();

    // run the search:
    await search(citiesAddresses);
    console.log("just finished building the db...");
  } catch (e) {
    console.log("on error: " + e.toString());
  }
};

const updateDb = async () =>{
  const db = connectToDb();
  await db.collection("addresswithfibers").updateMany({},
    {$set : {"location":null}},
    {upsert:false,
    multi:true})
}


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
  return db;
};


const getAddresses = async () => {
  const citiesAddresses = await FiberAddress.aggregate([
    {
      $group: {
        _id: { cityName: "$cityName" },
        address: {
          $push: {
            cityName: "$cityName",
            streetName: "$streetName",
            houseNumber: "$houseNumber",
            companies: "$companies",
          },
        },
      },
    },
  ]);

  return citiesAddresses;
};


const search = async (cities) => {
  for (let i = 0; i < cities.length; i++) {
    for (let j = 0; (j < numberOfAddresses && j <cities[i].address.length); j++) {
      const { cityName, streetName, houseNumber } = cities[i].address[j];
      
      // start the search:
      const scrapeScript = spawnSync("python", [
        "..\scrape\fiberAddressSearch.py",
        cityName,
        streetName,
        houseNumber,
      ]);

      const companiesResult = JSON.parse(scrapeScript.stdout);

      // check the result:
      await checkAddressResult(cities[i].address[j], companiesResult);
    }
  }
};


const checkAddressResult = async (address, companiesResult) => {
  const companies = [];
  for (let i = 0; i < companiesResult.length; i++) {
    for (const [key, value] of Object.entries(companiesResult[i])) {
      if (value == true) {
        companies.push(key);
      }
    }
  }
  
  if (companies.length != 0) {
    address.companies = companies;
    const addressWithFibers = new AddressWithFibers(address);
    await addressWithFibers.save();
  }
};

updateDb();
