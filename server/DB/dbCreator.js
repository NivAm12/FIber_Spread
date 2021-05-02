import mongoose from "mongoose";
import { FiberAddress } from "../models/FiberAddress.js";
import { AddressWithFibers } from "../models/AddressWithFibers.js";
import { spawn } from "child_process";
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
};

const createDb = async () => {
  try {
    connectToDb();

    // get group of the cities:
    const citiesAddresses = await getAddresses();

    // run the search:
    await search(citiesAddresses);

  } catch (e) {
    console.log("on error: " + e.toString());
  }
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
  for(let city = 0; city < cities.length; city++) {
    for (let i = 0; i < 1; i++) {
      const { cityName, streetName, houseNumber } = cities[city].address[i];

      const scrapeScript = spawn("python", [
        "../scrape/fiberAddressSearch.py",
        cityName,
        streetName,
        houseNumber,
      ]);

      scrapeScript.stdout.on("data", (result) => {
        const companiesResult = JSON.parse(result);
        const companies = [];

        for (company in companiesResult) {
          for (const [key, value] of Object.entries(company)) {
            if (value == true) { companies.push(key);}
          }

          if(companies.length != 0){
            cities.address[i].companies = companies;
            const addressWithFibers = new AddressWithFibers(cities[city].address[i]);
            addressWithFibers.save(); 
          }   
        }
      });
    }
  }
};

createDb();
