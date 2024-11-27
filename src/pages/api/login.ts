import Users from "@/utils/user_schema";
import { NextApiRequest, NextApiResponse } from "next";
import db from "@/utils/db_connect"; // Import the db function
import { getIronSession } from "iron-session";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db();
    const { username, password } = req.body;
    const records = await Users.findOne({
      username: username,
      password: password,
    }).exec();

    if (!records) {
      return res.status(404).json({ error: "User not found" });
    }

    const session = await getIronSession(req, res, {
      password: process.env.SECRET_COOKIE_PASSWORD as string,
      cookieName: "werhere",
      // cookieOptions: {
      //   secure: process.env.NODE_ENV === "production",
      // },
    });
    // @ts-ignore
    session.username = username;
    session.save();
    console.log(session);
    await session.save();

    res.status(200).json({ status: "success", message: "User found" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;
