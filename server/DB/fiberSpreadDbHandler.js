import { Schema, connection, connect } from "mongoose";
import { FiberAddress } from "../models/FiberAddress";

class FiberSpreadDbHandler {
  constructor() {
    if (!FiberSpreadDbHandler.instance) {
      this.connectToDb();
      FiberSpreadDbHandler.instance = this;
    }
  }

  connectToDb() {
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

  // db methods:

  async getFiberAddressesByFilter(filter) {
    try {
      const fiberAddresses = await FiberAddress.find(filter);

      if (fiberAddresses == null) throw new Error("No addresses in the Db.");

      return fiberAddresses;
    } catch (error) {
      console.error("DB error.");
      throw error;
    }
  }

  async insertFiberAddress(addressToInsert) {
    try {
      // create a new doc:
      const fiberAddressDoc = new FiberAddress(addressToInsert);

      // insert the new address to the db:
      await fiberAddressDoc.save();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
}

// singelton:
const fiberSpreadDbInstance = new FiberSpreadDbHandler();
Object.freeze(fiberSpreadDbInstance);

export default fiberSpreadDbInstance;