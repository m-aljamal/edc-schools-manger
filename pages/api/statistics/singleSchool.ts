import nc from "next-connect";
import dbMiddleware from "../../../middleware/db";
import onError from "../../../middleware/error";
import { Request } from "../../../types";
import { NextApiResponse } from "next";
import auth from "../../../middleware/auth";
import setDate from "../../../utils/setDate";
import { findRemainigDayes } from "../../../utils/findRemainigDayes";
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
              $match: {
                schoolId: req.userSchool,
              },
            },
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
              $match: {
                schoolId: req.userSchool,
              },
            },
            {
              $count: "totalEmployee",
            },
          ],
          gender: [
            {
              $match: { schoolId: req.userSchool },
            },
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
              $match: { schoolId: req.userSchool },
            },
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
              $match: { schoolId: req.userSchool, type: { $ne: "teacher" } },
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
              $match: { schoolId: req.userSchool, type: "teacher" },
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
              $match: { schoolId: req.userSchool, type: "teacher" },
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
              $match: { schoolId: req.userSchool, type: "teacher" },
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
              $match: { schoolId: req.userSchool, type: { $ne: "services" } },
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
              $match: { schoolId: req.userSchool },
            },
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
              $match: { schoolId: req.userSchool },
            },
            {
              $count: "totalStudents",
            },
          ],
          familySituation: [
            {
              $match: { schoolId: req.userSchool },
            },
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
              $match: { schoolId: req.userSchool },
            },
            {
              $group: {
                _id: { classNumber: "$classNumber" },
                total: { $sum: 1 },
              },
            },
            { $sort: { total: -1 } },
          ],
          division: [
            {
              $match: { schoolId: req.userSchool },
            },
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
              $match: { schoolId: req.userSchool },
            },
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
                schoolId: req.userSchool,
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
                schoolId: req.userSchool,
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
                schoolId: req.userSchool,
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
                schoolId: req.userSchool,
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

  const schoolDate = await req.db.collection("schools").findOne({
    _id: req.userSchool,
  });
  const date = setDate(new Date());

  let remaningDayes;
  let dateStart;
  let dateEnd;
  let status;
  const firstStart = setDate(schoolDate.firstTermSchoolDateStart);
  const firstEnd = setDate(schoolDate.firstTermSchoolDateEnd);
  const secoundStart = setDate(schoolDate.secoundTermSchoolDateStart);
  const secoundEnd = setDate(schoolDate.secoundTermSchoolDateEnd);

if(date < firstStart ){
  remaningDayes = findRemainigDayes(date, firstStart);
  dateStart = firstStart;
  dateEnd = firstEnd;
  status = ` متبقي  ${remaningDayes} يوم على بداية الفصل الاول`;
  
}
  if (date <= firstEnd && date >= firstStart) {
    remaningDayes = findRemainigDayes(date, firstEnd);
    dateStart = firstStart;
    dateEnd = firstEnd;
    status = ` متبقي  ${remaningDayes} يوم على نهاية الفصل الاول`;
  }
  if (date < secoundStart && date > firstEnd) {
 
    remaningDayes = findRemainigDayes(date, secoundStart);
    dateStart = secoundStart;
    status = ` متبقي  ${remaningDayes} يوم على بداية الفصل الثاني`;
  }
  if (date >= firstEnd && date <= secoundEnd && date >= secoundStart) {
    remaningDayes = findRemainigDayes(date, secoundEnd);
    dateStart = secoundStart;
    dateEnd = secoundEnd;
    status = ` متبقي  ${remaningDayes} يوم على نهاية الفصل الثاني`;
  }
  
  if (remaningDayes === 0) {
    status = "اليوم الاخير في الفصل الدراسي";
  }
   
  
  const percentage = Math.round(
    ((+date - dateStart) / (dateEnd - dateStart)) * 100
  );
  res.json({
    totalEmployee,
    totalStudents,
    empAbcenseByYear,
    dates: {
      remaningDayes,
      dateStart,
      dateEnd,
      status,
      percentage,
    },
  });
});

export default handler;
