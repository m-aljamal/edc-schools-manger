import nc from "next-connect";
import onError from "../../../../middleware/error";
import { NextApiResponse } from "next";
import { Request } from "../../../../types";
import dbMissleware from "../../../../middleware/db";
import { databaseCollections } from "../../../../static/databaseCollections";
import auth from "../../../../middleware/auth";
const handler = nc({
  onError,
});
handler.use(dbMissleware);
handler.use(auth);
handler.delete(async (req: Request, res: NextApiResponse) => {
  const collection = databaseCollections[req.query.type.toString()].names;

  await req.db.collection(collection).deleteOne({ _id: req.query.id });

  res.json("delete");
});

handler.put(async (req: Request, res: NextApiResponse) => {
  const absenceCollection =
    databaseCollections[req.query.type.toString()].abcence;
  const namesCollection = databaseCollections[req.query.type.toString()].names;
  const type = req.query.type;
  if (type !== "services" && type !== "students") {
    let checkEmail = await req.db
      .collection("employee")
      .findOne({ email: req.body.email });

    if (
      checkEmail &&
      req.query.type !== "services" &&
      checkEmail._id !== req.body._id
    ) {
      return res.status(400).json({ error: "الايميل مستخدم لشخص اخر" });
    }
    checkEmail = await req.db
      .collection("users")
      .findOne({ email: req.body.email });
    if (checkEmail) {
      return res.status(400).json({ error: "الايميل مستخدم لشخص اخر" });
    }
  }
  await req.db
    .collection(absenceCollection)
    .updateMany(
      { names: { $elemMatch: { _id: req.query.id } } },
      { $set: { "names.$": { _id: req.query.id, ...req.body } } }
    );

  const employee = await req.db.collection(namesCollection).updateOne(
    { _id: req.query.id },
    {
      $set: {
        ...req.body,
        email: req.body.email?.trim(),
        password: req.body.password?.trim(),
      },
    }
  );
  res.json(employee);
});

export default handler;
