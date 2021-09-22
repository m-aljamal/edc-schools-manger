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

  const name = "name =" + '"' + req.user.name + '"';
  const responce = await drive.files.list({
    q: name,
    includeItemsFromAllDrives: true,
    driveId: "0AKK2FEcg3f53Uk9PVA",
    supportsAllDrives: true,
    corpora: "drive",
  });
  const query =
    "parents in " +
    '"' +
    responce.data.files[0].id +
    '"' +
    "and mimeType: 'application/vnd.google-apps.folder'";
  const teacherFiles = await drive.files.list({
    q: query,
    includeItemsFromAllDrives: true,
    driveId: "0AKK2FEcg3f53Uk9PVA",
    supportsAllDrives: true,
    corpora: "drive",
  });

  res.json(teacherFiles.data.files);
});

export default handler;
