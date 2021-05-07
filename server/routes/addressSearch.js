import { Router } from "express";
const router = Router();
import {AddressWithFibers, fiberAddressValidation,} from "../models/AddressWithFibers.js";
import { spawnSync } from "child_process";
import { fileURLToPath } from 'url';
import {resolve, dirname} from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));

// addresses:
router.get("/", async (req, res) => {
  try {
    const fiberAddresses = await AddressWithFibers.find();
    res.send({ data: fiberAddresses });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

router.post("/", async (req, res) => {
  try {
    const { cityName, streetName, houseNumber } = req.body;

    // first search the DB:
    let fiberAddress = await AddressWithFibers.find({cityName, streetName, houseNumber,});
    
    // search for the address:
    if (fiberAddress.length == 0) {
        // search:
        const fiberCompanies = await search(cityName, streetName, houseNumber);

        // check the companies:
        const companiesResult = await checkAddressResult(fiberCompanies);

        if(companiesResult.length == 0){
            fiberAddress = null;
        }
        else{
            fiberAddress = await saveAndCreateFiberAddress(cityName, streetName, houseNumber, companiesResult);
        }

    }
    res.send({data: fiberAddress});
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

const search = async (cityName, streetName, houseNumber) => {
  // run the scrape search:
  const path = resolve(__dirname, "../scrape/fiberAddressSearch.py")

  const scrapeScript = spawnSync("python", [
    path,
    cityName,
    streetName,
    houseNumber,
  ]);

  const companiesResult = JSON.parse(scrapeScript.stdout);

  return companiesResult;
};

const checkAddressResult = async (companiesResult) => {
  const companies = [];

  // check which company has fibers on this address:
  for (let i = 0; i < companiesResult.length; i++) {
    for (const [key, value] of Object.entries(companiesResult[i])) {
      if (value == true) {
        companies.push(key);
      }
    }
  }

  return companies;
};

const saveAndCreateFiberAddress = async(cityName, streetName, houseNumber, companies) => {
    const addressWithFibers = new AddressWithFibers({cityName, streetName, houseNumber, companies});
    await addressWithFibers.save();
    return addressWithFibers;
}


export {router as addressSearch};
