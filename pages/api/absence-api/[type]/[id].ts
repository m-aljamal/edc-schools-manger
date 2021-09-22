import nc from "next-connect";
import onError from "../../../../middleware/error";
import { NextApiResponse } from "next";
import { Request } from "../../../../types";
import dbMissleware from "../../../../middleware/db";
import setDate from "../../../../utils/setDate";
import { databaseCollections } from "../../../../static/databaseCollections";

const handler = nc({
  onError,
});
handler.use(dbMissleware);
handler.put(async (req: Request, res: NextApiResponse) => {
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
  const newAbsence = await req.db.collection(collection).updateOne(
    { _id: req.query.id },
    {
      $set: {
        names: req.body.names,
        date: setDate(req.body.date),
      },
    }
  );

  res.status(200).json(newAbsence);
});

handler.get(async (req: Request, res: NextApiResponse) => {
  const collection = databaseCollections[req.query.type.toString()].abcence;

  const abcence = await req.db.collection(collection).findOne({
    date: { $eq: setDate(req.query.id.toString()) },
  });

  res.status(200).json(abcence);
});

// .findOne({ $and: [{ schoolId }, { date: { $eq: date } }] });
export default handler;

// export const getAbsenceBySchoolAndDate = async (
//   db: Db,
//   schoolId: string,
//   date: string
// ) => {
//   const findAbsences = await db
//     .collection("absences")
//     .findOne({ $and: [{ schoolId }, { date: { $eq: date } }] });

//   return findAbsences;
// };

// const firstDay = new Date(y, m, 1);
// const lastDay = new Date(y, m + 1, 0);
// const currentMonthTimeSheet = await req.db
//   .collection("absences")
//   .find({
//     $and: [
//       { date: { $gte: firstDay.toISOString() } },
//       { date: { $lte: lastDay.toISOString() } },
//     ],
