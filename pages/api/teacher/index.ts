import nc from "next-connect";
import dbMiddleware from "../../../middleware/db";
import onError from "../../../middleware/error";
import { TeacherRequest } from "../../../types";
import { NextApiResponse } from "next";
import teacher from "../../../middleware/teacher";

const handler = nc({
  onError,
});
handler.use(dbMiddleware);
handler.use(teacher);
handler.get(async (req: TeacherRequest, res: NextApiResponse) => {
  let students = await req.db
    .collection("students")
    .find({
      $and: [
        { schoolId: req.user.schoolId },
        { classNumber: req.user.classSuperVisor },
        { division: req.user.divisionSuperVisor },
      ],
    })
    .toArray();

  res.json(students);
});

export default handler;
