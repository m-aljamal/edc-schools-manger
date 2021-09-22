import { nanoid } from "nanoid";
import { Db } from "mongodb";

export const addStudent = async (
  db: Db,
  student: {
    name: string;
    fatherName: string;
    motherName: string;
    sex: string;
    dateOfBirth: Date;
    plaseOfBirth: string;
    numberOfBrother: number;
    familySituation: string;
    healthSituation: string;
    sickType: string;
    dateOfStart: Date;
    city: string;
    region: string;
    busPath: string;
    street: string;
    number1: string;
    contactName1: string;
    contactType1: string;
    number2: string;
    contactName2: string;
    contactType2: string;
    schoolId: string;
    classNumber: number;
    division: number;
    image: { id: string; url: string };
  }
) => {
  const newStudent = await db
    .collection("students")
    .insertOne({
      _id: nanoid(),
      ...student,
    })
    .then(({ ops }) => ops[0]);
  return newStudent;
};

export const getStudentsBySchool = async (db: Db, schoolId: string) => {
  return db.collection("students").find({ schoolId }).toArray();
};

// todo find way to element the data returned
export const getStudentsForNewAbsence = async (db: Db, schoolId: string) => {
  return db.collection("students").find({ schoolId }).toArray();
};
