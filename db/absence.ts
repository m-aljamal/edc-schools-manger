import { nanoid } from "nanoid";
import { Db } from "mongodb";
import setDate from "../utils/setDate";

export const addStudentAbsences = async (
  db: Db,
  absenceList: {
    schoolId: string;
    date: Date;
    reason: string;
    absenceIds: [];
  }
) => {
  const absenceUsers = await db
    .collection("students")
    .find({ _id: { $in: absenceList.absenceIds } })
    .project({ name: 1, dateOfStart: 1 })
    .toArray();

  const newAbsence = await db
    .collection("studentsAbcence")
    .insertOne({
      _id: nanoid(),
      names: absenceUsers,
      date: setDate(absenceList.date),
      reason: absenceList.reason,
      schoolId: absenceList.schoolId,
    })
    .then(({ ops }) => ops[0]);

  return newAbsence;
};

export const addAbsences = async (
  db: Db,
  absenceList: {
    schoolId: string;
    date: Date;

    names: [];
  }
) => {
  // const absenceUsers = await db
  //   .collection("employee")
  //   .find({ _id: { $in: absenceList.absenceIds } })
  //   .project({ name: 1, dateOfStart: 1 })
  //   .toArray();

  const newAbsence = await db
    .collection("absences")
    .insertOne({
      _id: nanoid(),
      names: absenceList.names,
      date: setDate(absenceList.date),

      schoolId: absenceList.schoolId,
    })
    .then(({ ops }) => ops[0]);

  return newAbsence;
};

export const getAbsenceBySchool = async (db: Db, schoolId: string) => {
  return db.collection("absences").find({ schoolId }).toArray();
};

export const getAbsenceBySchoolAndDate = async (
  db: Db,
  schoolId: string,
  date: string
) => {
  const findAbsences = await db
    .collection("absences")
    .findOne({ $and: [{ schoolId }, { date: { $eq: date } }] });

  return findAbsences;
};
