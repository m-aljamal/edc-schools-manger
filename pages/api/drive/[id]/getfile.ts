import { NextApiResponse } from "next";
import nc from "next-connect";
import onError from "../../../../middleware/error";
import { Request } from "../../../../types";
import { googleDrive } from "../../../../db";

const handler = nc({
  onError,
});

handler.get(async (req: Request, res: NextApiResponse) => {
  const drive = await googleDrive();

  const fileID = req.query.id.toString();

  await drive.permissions.create({
    fileId: fileID,

    supportsTeamDrives: true,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
  });
  const result = await drive.files.get({
    fileId: fileID,
    supportsTeamDrives: true,
    fields: "webViewLink, webContentLink",
  });

  res.json(result?.data);
});

export default handler;
