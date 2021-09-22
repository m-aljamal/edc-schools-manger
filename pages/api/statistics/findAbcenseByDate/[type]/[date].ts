import nc from "next-connect";
import onError from "../../../../../middleware/error";
import { NextApiResponse } from "next";
import { Request } from "../../../../../types";
import dbMissleware from "../../../../../middleware/db";
import setDate from "../../../../../utils/setDate";
import { auth } from "../../../../../middleware";
const handler = nc({
  onError,
});
handler.use(dbMissleware);
handler.use(auth);
handler.get(async (req: Request, res: NextApiResponse) => {
  let abcence;
  if (req.query.type === "employees") {
    // if (req.headers.isadmin) {
    //   abcence = await req.db
    //     .collection("absences")
    //     .aggregate([
    //       {
    //         $match: {
    //           date: { $eq: setDate(req.query.date.toString()) },
    //         },
    //       },
    //       {
    //         $unwind: "$names",
    //       },
    //       { $project: { names: 1 } },
    //     ])
    //     .toArray();

    //   return res.status(200).json(abcence.length);
    // }
    abcence = await req.db.collection("absences").findOne({
      $and: [
        { schoolId: req.userSchool },
        { date: { $eq: setDate(req.query.date.toString()) } },
      ],
    });

    return res.status(200).json(abcence?.names.length);
  }
  if (req.query.type === "students") {
    // if (req.headers.isadmin) {
    //   abcence = await req.db
    //     .collection("studentsAbcence")
    //     .aggregate([
    //       {
    //         $match: {
    //           date: { $eq: setDate(req.query.date.toString()) },
    //         },
    //       },
    //       {
    //         $unwind: "$names",
    //       },
    //       { $project: { names: 1 } },
    //     ])
    //     .toArray();

    //   return res.status(200).json(abcence.length);
    // }
    abcence = await req.db.collection("studentsAbcence").findOne({
      $and: [
        { schoolId: req.userSchool },
        { date: { $eq: setDate(req.query.date.toString()) } },
      ],
    });
    return res.status(200).json(abcence?.names.length);
  }

  // console.log(req.query.type);
  // console.log(req.query.date);

  // const abcence = await req.db.collection("absences").findOne({
  //   $and: [
  //     { schoolId: req.userSchool },
  //     { date: { $eq: setDate(req.query.date.toString()) } },
  //   ],
  // });
  // console.log(abcence);
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
