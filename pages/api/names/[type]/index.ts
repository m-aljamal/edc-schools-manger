import nc from "next-connect";
import dbMiddleware from "../../../../middleware/db";
import onError from "../../../../middleware/error";
import { Request } from "../../../../types";
import { NextApiResponse } from "next";
import auth from "../../../../middleware/auth";
import { databaseCollections } from "../../../../static/databaseCollections";
import { nanoid } from "nanoid";
import {
  manger,
  psychologist,
  secretary,
  superViser,
  teacherFolders,
} from "../../../../utils/driveFolders";
import { createAndFiles } from "../../../../utils/createAndUploadFiles";

const handler = nc({
  onError,
});

handler.use(dbMiddleware);
handler.use(auth);
handler.get(async (req: Request, res: NextApiResponse) => {
  const collection = databaseCollections[req.query.type.toString()].names;
  let employees;
  req.query.type === "employees"
    ? (employees = await req.db
        .collection(collection)
        .find({
          schoolId: req.userSchool,
        })
        .toArray())
    : (employees = await req.db
        .collection(collection)
        .find({
          $and: [{ schoolId: req.userSchool }, { type: req.query.type }],
        })
        .sort({ createdAt: -1 })
        .toArray());

  res.json(employees);
});

handler.post(async (req: Request, res: NextApiResponse) => {
  const collection = databaseCollections[req.query.type.toString()].names;
  let newEmployee = await req.db.collection(collection).findOne({
    name: req.body.name,
    fatherName: req.body.fatherName,
    motherName: req.body.motherName,
    schoolId: req.userSchool,
  });
  if (newEmployee) return res.status(400).json({ error: "الاسم مسجل  مسبقا" });
  const type = req.query.type;
  if (type !== "services" && type !== "students") {
    let checkEmail = await req.db
      .collection("employee")
      .findOne({ email: req.body.email });
    if (checkEmail) {
      return res.status(400).json({ error: "الايميل مستخدم لشخص اخر" });
    }
    checkEmail = await req.db
      .collection("users")
      .findOne({ email: req.body.email });
    if (checkEmail) {
      return res.status(400).json({ error: "الايميل مستخدم لشخص اخر" });
    }
  }

  if (req.body.type === "teacher") {
    createAndFiles(req.body.name, req.driveFileId, res, teacherFolders);
  }
  if (req.body.jobTitle === "مدير المدرسة") {
    createAndFiles(req.body.name, req.driveFileId, res, manger);
  }
  if (req.body.jobTitle === "مرشد نفسي") {
    createAndFiles(req.body.name, req.driveFileId, res, psychologist);
  }
  if (req.body.jobTitle === "مشرف المدرسة") {
    createAndFiles(req.body.name, req.driveFileId, res, superViser);
  }
  if (req.body.jobTitle === "امين سر") {
    createAndFiles(req.body.name, req.driveFileId, res, secretary);
  }

  newEmployee = await req.db
    .collection(collection)
    .insertOne({
      _id: nanoid(),
      ...req.body,
      schoolId: req.userSchool,
      createdAt: Date.now(),
    })
    .then(({ ops }) => ops[0]);

  res.send({ data: newEmployee });
});

export default handler;
