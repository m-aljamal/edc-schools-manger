import nc from "next-connect";
import dbMissleware from "../../../middleware/db";
import onError from "../../../middleware/error";
import { Request } from "../../../types";
import { NextApiResponse } from "next";
const handler = nc({
  onError,
});

handler.use(dbMissleware);
handler.get(async (req: Request, res: NextApiResponse) => {
  const adminUsers = await req.db
    .collection("users")
    .find({ isAdmin: true })
    .toArray();
  const schoolsUsers = await req.db
    .collection("users")
    .find({ isAdmin: false })
    .toArray();
  const schools = await req.db.collection("schools").find({}).toArray();
  res.send({ adminUsers, schoolsUsers, schools });
});
export default handler;
