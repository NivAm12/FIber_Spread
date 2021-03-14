import express from "express";
import FiberSpreadDbHandler from "../DB/fiberSpreadDbHandler.js";
import {FiberAddress, fiberAddressValidation,} from "../models/FiberAddress.js";
import bodyParser from "body-parser";

// set the app:
const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});

// HTTP REQUESTS:

app.get("/fiberAddresses", async (req, res) => {
  try {
    // get the desire addresses:
    const fiberAddresses = await FiberSpreadDbHandler.getFiberAddressesByFilter(
      req.body.filter
    );

    // check the addressess:
    if (fiberAddresses == null) {
      res.status(500).send("Error, there is no addresses to obtain.");
      return;
    }

    // return the data:
    res.send(fiberAddresses);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error in proccesing the request.");
  }
});

app.post("/fiberAddresses", async (req, res) => {
  // check if the address is legal:
  const { error } = fiberAddressValidation(req.body);

  if (error) {
    return res.status(400).send("Invalid address.");
  }

  try {
    // find if the address is already exist:
    filter = { streetName: req.body.streetName, cityName: req.body.cityName };
    const fiberAddress = await FiberAddress.findOneAndUpdate(filter, req.body, {
      upsert: true,
      new: true,
    });

    if (fiberAddress == null) throw new Error("Database error.");

    // return the request:
    res.send(fiberAddress);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error in proccesing the request.");
  }
});
