import nc from "next-connect";
import onError from "../../../middleware/error";
import { Request } from "../../../types";
import { NextApiResponse } from "next";
import cookie from "cookie";
const handler = nc({
  onError,
});

handler.post(async (req: Request, res: NextApiResponse) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("auth_token", "logout", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",

      path: "/",
    })
  );
  res.send({});
});
export default handler;
