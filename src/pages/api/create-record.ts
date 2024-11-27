import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { Fields, Files } from "formidable";
import cloudinary from "@/utils/cloudinary_connect";
import Record from "@/utils/record_schema";
import db from "@/utils/db_connect";
import mongoose from "mongoose";

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parsing
  },
};

export const parseForm = (
  req: NextApiRequest
): Promise<{ fields: Fields; files: Files }> => {
  return new Promise((resolve, reject) => {
    const form = formidable({});

    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        resolve({ fields, files });
      }
    });
  });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db();
    const { files, fields } = await parseForm(req);

    // Upload files to Cloudinary
    const uploadFile = async (file: formidable.File) => {
      return new Promise<{ secure_url: string }>((resolve, reject) => {
        cloudinary.uploader.upload(file.filepath, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result as { secure_url: string });
          }
        });
      });
    };

    const voorkantIdentiteitsbewijs = files.voorkantIdentiteitsbewijs
      ? await uploadFile(files.voorkantIdentiteitsbewijs[0])
      : null;
    const achterkantIdentiteitsbewijs = files.achterkantIdentiteitsbewijs
      ? await uploadFile(files.achterkantIdentiteitsbewijs[0])
      : null;

    // Save record to database
    const record = new Record({
      voornaam: fields.voornaam ? fields.voornaam[0] : null,
      achternaam: fields.achternaam ? fields.achternaam[0] : null,
      email: fields.email ? fields.email[0] : null,
      telefoonnummer: fields.telefoonnummer ? fields.telefoonnummer[0] : null,
      adres: fields.adres ? fields.adres[0] : null,
      postcode: fields.postcode ? fields.postcode[0] : null,
      woonplaats: fields.woonplaats ? fields.woonplaats[0] : null,
      bsn: fields.bsn ? fields.bsn[0] : null,
      geboorteplaats: fields.geboorteplaats ? fields.geboorteplaats[0] : null,
      verblijfsvergunningNummer: fields.verblijfsvergunningNummer
        ? fields.verblijfsvergunningNummer[0]
        : null,
      begindatum: fields.begindatum ? fields.begindatum[0] : null,
      einddatum: fields.einddatum ? fields.einddatum[0] : null,
      taalniveau: fields.taalniveau ? fields.taalniveau[0] : null,
      uitkeringsstatus: fields.uitkeringsstatus
        ? fields.uitkeringsstatus[0]
        : null,
      naturalisatieStatus: fields.naturalisatieStatus
        ? fields.naturalisatieStatus[0]
        : null,
      voorkantIdentiteitsbewijs: voorkantIdentiteitsbewijs?.secure_url,
      achterkantIdentiteitsbewijs: achterkantIdentiteitsbewijs?.secure_url,
    });
    await record.save();
    await mongoose.disconnect();

    res
      .status(200)
      .json({ message: "Files uploaded successfully", status: "success" });
  } catch (error) {
    console.error(error);
    await mongoose.disconnect();
    res.status(500).json({ error: "Something went wrong", status: "error" });
  }
};

export default handler;
