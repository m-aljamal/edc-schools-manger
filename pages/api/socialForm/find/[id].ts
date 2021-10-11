import nc from "next-connect";
import onError from "../../../../middleware/error";
import dbMiddleware from "../../../../middleware/db";
import auth from "../../../../middleware/auth";
import { Request } from "../../../../types";

const handler = nc({
  onError,
});

handler.use(dbMiddleware);
handler.use(auth);

handler.get(async (req: Request, res) => {
  const findSocialForm = await req.db.collection("social-froms").findOne({
    studentId: req.query.id,
  });
  if (!findSocialForm) {
    return res.json("لايوجد استمارة لهاذا الطالب");
  }
  res.json(findSocialForm);
});

export default handler;
