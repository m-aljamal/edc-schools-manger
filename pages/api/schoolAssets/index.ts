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
  const asset = await req.db
    .collection("asset")
    .insertOne({
      _id: nanoid(),
      ...req.body,
      schoolId: req.userSchool,
    })
    .then(({ ops }) => ops[0]);
  res.send(asset);
});

handler.get(async (req: Request, res: NextApiResponse) => {
  const assets = await req.db
    .collection("asset")
    .find({
      schoolId: req.userSchool,
    })
    .toArray();

  res.send(assets);
});

export default handler;
