import nc from "next-connect";
import dbMissleware from "../../../middleware/db";
import { googleDrive, user } from "../../../db";
import onError from "../../../middleware/error";
import { Request } from "../../../types";
import { NextApiResponse } from "next";
import { nanoid } from "nanoid";

const handler = nc({
  onError,
});

handler.use(dbMissleware);
handler.post(async (req: Request, res: NextApiResponse) => {
  const { name, email, password, isAdmin } = req.body;
  let newUser = await req.db.collection("users").findOne({ email });
  if (newUser) return res.status(400).json({ error: "المستخدم مسجل مسبقا" });
  if (!isAdmin && !req.body.schoolName) {
    return res.status(400).json({ error: "الرجاء ادخال اسم المدرسة" });
  }
  newUser = await req.db
    .collection("users")
    .insertOne({
      _id: nanoid(),
      name,
      email,
      password,
      isAdmin,
      createdAt: new Date().toDateString(),
    })
    .then(({ ops }) => ops[0]);
  if (!isAdmin) {
    const fileMetadata = {
      name: req.body.schoolName,
      mimeType: "application/vnd.google-apps.folder",
      driveId: "0AKK2FEcg3f53Uk9PVA",
      parents: ["0AKK2FEcg3f53Uk9PVA"],
    };

    const drive = await googleDrive();
    const file = await drive.files.create({
      requestBody: fileMetadata,
      supportsAllDrives: true,
    });
    await req.db.collection("schools").insertOne({
      _id: nanoid(),
      name: req.body.schoolName,
      director: newUser._id,
      driveFileId: file.data.id,
      firstTermSchoolDateStart: req.body.firstTermSchoolDateStart,
      firstTermSchoolDateEnd: req.body.firstTermSchoolDateEnd,
      secoundTermSchoolDateStart: req.body.secoundTermSchoolDateStart,
      secoundTermSchoolDateEnd: req.body.secoundTermSchoolDateEnd,
    });
  }
  res.send({ newUser });
});
export default handler;
