import nc from "next-connect";
import dbMiddleware from " ../../../middleware/db";
import onError from " ../../../middleware/error";
import { Request } from " ../../../types";
import { NextApiResponse } from "next";
import auth from " ../../../middleware/auth";
import { nanoid } from "nanoid";

const handler = nc({
  onError,
});
handler.use(dbMiddleware);
handler.use(auth);

handler.post(async (req: Request, res: NextApiResponse) => {
  const library = await req.db
    .collection("library")
    .insertOne({
      _id: nanoid(),
      ...req.body,
      schoolId: req.userSchool,
    })
    .then(({ ops }) => ops[0]);
  res.send(library);
});

handler.get(async (req: Request, res: NextApiResponse) => {
  const libraries = await req.db
    .collection("library")
    .find({
      schoolId: req.userSchool,
    })
    .toArray();

  res.send(libraries);
});

export default handler;
