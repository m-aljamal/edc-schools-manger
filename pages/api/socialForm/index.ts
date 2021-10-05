import { nanoid } from "nanoid";
import nc from "next-connect";
import onError from "../../../middleware/error";
import dbMiddleware from "../../../middleware/db";
import auth from "../../../middleware/auth";
import { Request } from "../../../types";

const handler = nc({
  onError,
});

handler.use(dbMiddleware);
handler.use(auth);

handler.post(async (req: Request, res) => {
  const findSocialForm = await req.db.collection("social-froms").findOne({
    studentId: req.body.studentId,
  });
  if (findSocialForm) {
    return res.status(400).json({ error: "يوجد استمارة باسم هذا الطالب" });
  }

  let newSocialForm = await req.db
    .collection("social-froms")
    .insertOne({
      _id: nanoid(),
      ...req.body,
      schoolId: req.userSchool,
    })
    .then(({ ops }) => ops[0]);
  res.send(newSocialForm);
});

export default handler;
