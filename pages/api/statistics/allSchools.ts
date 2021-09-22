import nc from "next-connect";
import dbMiddleware from "../../../middleware/db";
import onError from "../../../middleware/error";
import { Request } from "../../../types";
import { NextApiResponse } from "next";

import auth from "../../../middleware/auth";
const handler = nc({
  onError,
});
handler.use(dbMiddleware);
handler.use(auth);
handler.get(async (req: Request, res: NextApiResponse) => {
  const totalEmployee = await req.db
    .collection("employee")
    .aggregate([
      {
        $facet: {
          employeeType: [
            {
              $group: {
                _id: { type: "$type" },
                total: { $sum: 1 },
              },
            },
            { $sort: { total: -1 } },
          ],
          totalEmployee: [
            {
              $count: "totalEmployee",
            },
          ],
          gender: [
            {
              $group: {
                _id: { sex: "$sex", type: "$type" },
                total: { $sum: 1 },
              },
            },
            { $sort: { total: -1 } },
          ],
          typeOfCertifcate: [
            {
              $group: {
                _id: { TypeOfCertifcate: "$TypeOfCertifcate" },
                total: { $sum: 1 },
              },
            },
            { $sort: { total: -1 } },
          ],
          jobTitle: [
            {
              $match: { type: { $ne: "teacher" } },
            },
            {
              $group: {
                _id: { jobTitle: "$jobTitle" },
                total: { $sum: 1 },
              },
            },
            { $sort: { total: 1 } },
          ],
          subject: [
            {
              $match: { type: "teacher" },
            },
            { $project: { subject: 1 } },
            { $unwind: "$subject" },
            {
              $group: {
                _id: { subject: "$subject" },
                total: { $sum: 1 },
              },
            },
            { $sort: { total: -1 } },
          ],
          division: [
            {
              $match: { type: "teacher" },
            },
            { $project: { division: 1, classNumber: 1 } },
            { $unwind: "$division" },
            { $unwind: "$classNumber" },
            {
              $group: {
                _id: { classNumber: "$classNumber", division: "$division" },
                total: { $sum: 1 },
              },
            },
            { $sort: { total: -1 } },
          ],
          classNumber: [
            {
              $match: { type: "teacher" },
            },
            { $project: { classNumber: 1 } },
            { $unwind: "$classNumber" },
            {
              $group: {
                _id: { classNumber: "$classNumber" },
                total: { $sum: 1 },
              },
            },
            { $sort: { total: -1 } },
          ],

          typeOfDegree: [
            {
              $match: { type: { $ne: "services" } },
            },
            {
              $group: {
                _id: { typeOfDegree: "$typeOfDegree" },
                total: { $sum: 1 },
              },
            },
            { $sort: { total: -1 } },
          ],
        },
      },
    ])
    .toArray();

  const totalStudents = await req.db
    .collection("students")
    .aggregate([
      {
        $facet: {
          gender: [
            {
              $group: {
                _id: { sex: "$sex" },
                total: { $sum: 1 },
              },
            },

            { $sort: { total: -1 } },
          ],
          totalStudents: [
            {
              $count: "totalStudents",
            },
          ],
          familySituation: [
            {
              $group: {
                _id: { familySituation: "$familySituation" },
                total: { $sum: 1 },
              },
            },
            { $sort: { total: -1 } },
          ],
          classNumber: [
            {
              $group: {
                _id: { classNumber: "$classNumber" },
                total: { $sum: 1 },
              },
            },
            { $sort: { total: -1 } },
          ],
          division: [
            { $project: { division: 1, classNumber: 1 } },

            {
              $group: {
                _id: { classNumber: "$classNumber", division: "$division" },
                total: { $sum: 1 },
              },
            },
            { $sort: { total: -1 } },
          ],
          healthSituation: [
            {
              $group: {
                _id: { healthSituation: "$healthSituation" },
                total: { $sum: 1 },
              },
            },
            { $sort: { total: -1 } },
          ],
        },
      },
    ])
    .toArray();

  const empAbcenseByYear = await req.db
    .collection("absences")
    .aggregate([
      {
        $facet: {
          absenceOfYear: [
            {
              $match: {
                $and: [
                  { date: { $gte: new Date(new Date().getFullYear(), 0, 1) } },
                  {
                    date: { $lte: new Date(new Date().getFullYear(), 11, 31) },
                  },
                ],
              },
            },
            { $unwind: "$names" },
            {
              $group: {
                _id: { name: "$names.name" },
                total: { $sum: 1 },
              },
            },

            { $sort: { total: -1 } },
          ],
          absenceByReason: [
            {
              $match: {
                $and: [
                  { date: { $gte: new Date(new Date().getFullYear(), 0, 1) } },
                  {
                    date: { $lte: new Date(new Date().getFullYear(), 11, 31) },
                  },
                ],
              },
            },
            { $unwind: "$names" },
            {
              $group: {
                _id: { name: "$names.reason" },
                total: { $sum: 1 },
              },
            },

            { $sort: { total: -1 } },
          ],
          absenceByNameAndReson: [
            {
              $match: {
                $and: [
                  { date: { $gte: new Date(new Date().getFullYear(), 0, 1) } },
                  {
                    date: { $lte: new Date(new Date().getFullYear(), 11, 31) },
                  },
                ],
              },
            },
            { $unwind: "$names" },
            {
              $group: {
                _id: { name: "$names.name", reason: "$names.reason" },
                total: { $sum: 1 },
              },
            },

            { $sort: { total: -1 } },
          ],
          totalEmployeeAbsence: [
            {
              $match: {
                $and: [
                  { date: { $gte: new Date(new Date().getFullYear(), 0, 1) } },
                  {
                    date: { $lte: new Date(new Date().getFullYear(), 11, 31) },
                  },
                ],
              },
            },
            { $unwind: "$names" },
            {
              $count: "totalAbsence",
            },
          ],
        },
      },
    ])
    .toArray();
console.log({ totalEmployee, totalStudents, empAbcenseByYear });

  res.json({ totalEmployee, totalStudents, empAbcenseByYear });
});

export default handler;
