import { NextApiResponse } from "next";
import nc from "next-connect";
import onError from "../../../../middleware/error";
import { Request } from "../../../../types";
import auth from "../../../../middleware/auth";
import dbMiddleware from "../../../../middleware/db";
import { googleDrive } from "../../../../db";

const handler = nc({
  onError,
});
handler.use(dbMiddleware);
handler.use(auth);

handler.get(async (req: Request, res: NextApiResponse) => {
  const drive = await googleDrive();
  const query = "parents in " + '"' + req.query.id + '"';

  const responce = await drive.files.list({
    q: query,
    // fields: "nextPageToken, files(id, name)",

    includeItemsFromAllDrives: true,
    driveId: "0AKK2FEcg3f53Uk9PVA",
    supportsAllDrives: true,
    corpora: "drive",
  });

  res.json(responce.data.files);
});

export default handler;
