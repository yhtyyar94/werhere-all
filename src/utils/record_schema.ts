import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();

const recordSchema = new mongoose.Schema({
  voornaam: String,
  achternaam: String,
  email: String,
  telefoonnummer: String,
  adres: String,
  postcode: String,
  woonplaats: String,
  bsn: String,
  geboorteplaats: String,
  verblijfsvergunningNummer: String,
  begindatum: String,
  einddatum: String,
  taalniveau: String,
  uitkeringsstatus: String,
  naturalisatieStatus: String,
  voorkantIdentiteitsbewijs: String,
  achterkantIdentiteitsbewijs: String,
  createdAt: { type: Date, default: Date.now },
});

const modelName = "records";

export default mongoose.models[modelName] ||
  mongoose.model(modelName, recordSchema, process.env.COLLECTION);
