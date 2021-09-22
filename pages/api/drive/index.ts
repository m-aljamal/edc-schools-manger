import { NextApiResponse } from "next";
import nc from "next-connect";
import onError from "../../../middleware/error";
import { Request } from "../../../types";
import auth from "../../../middleware/auth";
import dbMiddleware from "../../../middleware/db";
import { googleDrive } from "../../../db";

const handler = nc({
  onError,
});
handler.use(dbMiddleware);
handler.use(auth);

handler.get(async (req: Request, res: NextApiResponse) => {

   
  
  const drive = await googleDrive();
  

  const query =
    "parents in " +
    '"' +
    req.driveFileId +
    '"' +
    "and mimeType: 'application/vnd.google-apps.folder'";

  const name = "name =" + '"' + req.user.name + '"';
  const responce = await drive.files.list({
    q: req.user?.type ? name : query,
    // fields: "nextPageToken, files(id, name)",

    includeItemsFromAllDrives: true,
    driveId: "0AKK2FEcg3f53Uk9PVA",
    supportsAllDrives: true,
    corpora: "drive",
  });

  res.json(responce.data.files);
});

handler.post(async (req: Request, res: NextApiResponse) => {
  var fileMetadata = {
    name: req.body.name,
    mimeType: "application/vnd.google-apps.folder",
    driveId: "0AKK2FEcg3f53Uk9PVA",
    parents: ["1xzIEmPtC13forz9yqDrkejmrkjVqm0LY"],
  };
  const drive = await googleDrive();
  const result = await drive.files.create({
    requestBody: fileMetadata,
    supportsAllDrives: true,
  });
  res.json(result);
});
export default handler;
