import nc from "next-connect";
import dbMissleware from "../../../middleware/db";
import { school } from "../../../db";
import onError from "../../../middleware/error";
import { Request } from "../../../types";
import { NextApiResponse } from "next";
import admin from "../../../middleware/admin";
const handler = nc({
  onError,
});

handler.use(dbMissleware);
handler.use(admin);
handler.post(async (req: Request, res: NextApiResponse) => {
  const { name, director } = req.body;
  let newSchool = await req.db.collection("schools").findOne({ name });
  if (newSchool) return res.status(400).json({ error: "المدرسة مسجلة مسبقا" });
  newSchool = await school.createSchool(req.db, {
    name,
    director,
  });

  res.send({ data: newSchool });
});
export default handler;
