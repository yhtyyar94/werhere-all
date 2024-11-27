import Record from "@/utils/record_schema";
import db from "@/utils/db_connect";
import { NextApiRequest, NextApiResponse } from "next";
import { run } from "node:test";

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parsing
  },
  runtime: "edge",
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db();
    const records = await Record.find();

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default handler;
