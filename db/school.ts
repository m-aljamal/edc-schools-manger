import { nanoid } from "nanoid";
import { Db } from "mongodb";

export const createSchool = async (
  db: Db,
  school: { name: string; director: string }
) => {
  const newSchool = await db
    .collection("schools")
    .insertOne({
      _id: nanoid(),
      ...school,
    })
    .then(({ ops }) => ops[0]);
  return newSchool;
};

export const getSchools = async (db: Db) => {
  return db.collection("schools").find({}).toArray();
};

export const getSchoolById = async (db: Db, id: string) => {
  return db.collection("schools").findOne({ _id: id });
};

export const getSchoolByDirector = async (db: Db, directorId: string) => {
  return db.collection("schools").findOne({ director: directorId });
};

export const getTotal = async (db: Db, schoolId: string) => {
  const totalEmployee = await db
    .collection("employee")
    .aggregate([
      {
        $facet: {
          employeeType: [
            {
              $match: {
                schoolId: schoolId,
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
                schoolId: schoolId,
              },
            },
            {
              $count: "totalEmployee",
            },
          ],
          gender: [
            {
              $match: { schoolId: schoolId },
            },
            {
              $group: {
                _id: { sex: "$sex" },
                total: { $sum: 1 },
              },
            },
            { $sort: { total: -1 } },
          ],
          typeOfCertifcate: [
            {
              $match: { schoolId: schoolId },
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
              $match: { schoolId: schoolId, type: { $ne: "teacher" } },
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
              $match: { schoolId: schoolId, type: "teacher" },
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
              $match: { schoolId: schoolId, type: "teacher" },
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
              $match: { schoolId: schoolId, type: "teacher" },
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
              $match: { schoolId: schoolId, type: { $ne: "services" } },
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
  const totalStudents = await db
    .collection("students")
    .aggregate([
      {
        $facet: {
          gender: [
            {
              $match: { schoolId: schoolId },
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
              $match: { schoolId: schoolId },
            },
            {
              $count: "totalStudents",
            },
          ],
          familySituation: [
            {
              $match: { schoolId: schoolId },
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
              $match: { schoolId: schoolId },
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
              $match: { schoolId: schoolId },
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
              $match: { schoolId: schoolId },
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
  return {
    totalEmployee,
    totalStudents,
  };
};
