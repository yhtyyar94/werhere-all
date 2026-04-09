import Record from "@/utils/record_schema";
import db from "@/utils/db_connect";
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parsing
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db();
    const record = await Record.findOne({ email: req.query.email });

    await mongoose.disconnect();

    res.status(200).json(record);
  } catch (error) {
    await mongoose.disconnect();
    res.status(500).json({ error });
  }
};
export default handler;
