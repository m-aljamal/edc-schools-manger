import cloudinary from "cloudinary";
import nc from "next-connect";
import onError from "../../../middleware/error";
import { NextApiResponse, NextApiRequest } from "next";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const handler = nc({
  onError,
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await cloudinary.v2.uploader.destroy(req.body.public_id);

  res.json("image removed");
});
export default handler;
