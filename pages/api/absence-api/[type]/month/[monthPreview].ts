import nc from "next-connect";
import onError from "../../../../../middleware/error";
import { NextApiResponse } from "next";
import { Request } from "../../../../../types";
import dbMissleware from "../../../../../middleware/db";
import setDate from "../../../../../utils/setDate";
import { databaseCollections } from "../../../../../static/databaseCollections";

const handler = nc({
  onError,
});
handler.use(dbMissleware);
handler.get(async (req: Request, res: NextApiResponse) => {
  const collection = databaseCollections[req.query.type.toString()].abcence;

  const date = setDate(req.query.monthPreview.toString());
  const y = date.getFullYear();
  const m = date.getMonth();
  const firstDay = new Date(y, m, 1);
  const lastDay = new Date(y, m + 1, 0);
  const currentMonthTimeSheet = await req.db
    .collection(collection)
    .find({
      $and: [{ date: { $gte: firstDay } }, { date: { $lte: lastDay } }],
    })
    .toArray();

  res.json(currentMonthTimeSheet);
});

export default handler;
