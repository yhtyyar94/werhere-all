import db from "@/utils/db_connect";
import Users from "@/utils/user_schema";
const getUserFromDb = async (email: string, password: string) => {
  try {
    await db();
    const user = await Users.findOne({ username: email, password });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getUserFromDb;
