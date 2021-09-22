import nc from "next-connect";
import dbMissleware from "../../../../middleware/db";
import { absence } from "../../../../db";
import onError from "../../../../middleware/error";
import { Request } from "../../../../types";
import { NextApiResponse } from "next";
import auth from "../../../../middleware/auth";
import setDate from "../../../../utils/setDate";
import { nanoid } from "nanoid";
import { databaseCollections } from "../../../../static/databaseCollections";
import { checkWeekDays } from "../../../../utils/weekendDays";
const handler = nc({
  onError,
});
handler.use(dbMissleware);
handler.use(auth);
handler.post(async (req: Request, res: NextApiResponse) => {
  const collection = databaseCollections[req.query.type.toString()].abcence;

  if (req.body.names.length === 0) {
    return res.status(400).json({ error: "لايوجد اسماء غياب" });
  }
  if (!req.body.date) {
    return res.status(400).json({ error: "الرجاء اختيار التاريخ" });
  }
  const date = setDate(req.body.date);

  if (date.getDay() == 4 || date.getDay() == 5) {
    return res
      .status(400)
      .json({ error: "لايمكن تسجيل الغياب لان التاريخ هو يوم عطلة" });
  }
  const checkDateOfStart = req.body?.names.find(
    (n) => setDate(n.dateOfStart) > date
  );
  if (checkDateOfStart) {
    return res.status(400).json({
      error: `الاسم ${checkDateOfStart.name} لم يكن مقيد في النظام في هذا التاريخ `,
    });
  }

  let newAbsence = await req.db.collection(collection).findOne({
    $and: [{ schoolId: req.userSchool }, { date }],
  });

  if (newAbsence)
    return res
      .status(400)
      .json({ error: "تم تسجيل الغياب بهذا التاريخ مسبقا" });

  newAbsence = await req.db
    .collection(collection)
    .insertOne({
      _id: nanoid(),
      names: req.body.names,
      date,

      schoolId: req.userSchool,
    })
    .then(({ ops }) => ops[0]);

  res.json(newAbsence);
});
export default handler;
