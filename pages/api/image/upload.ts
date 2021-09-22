import cloudinary from "cloudinary";

import { nanoid } from "nanoid";
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
  try {
    let result = await cloudinary.v2.uploader.upload(req.body.image, {
      public_id: nanoid(),
      resource_type: "auto",
    });

    res.json({ public_id: result.public_id, url: result.secure_url });
  } catch (error) {
    console.log(error);
  }
});
export default handler;
