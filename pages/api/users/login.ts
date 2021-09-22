import nc from "next-connect";
import dbMissleware from "../../../middleware/db";
import { user } from "../../../db";
import onError from "../../../middleware/error";
import { Request } from "../../../types";
import { NextApiResponse } from "next";
import cookie from "cookie";
import jwt from "jsonwebtoken";

const handler = nc({
  onError,
});

handler.use(dbMissleware);
handler.post(async (req: Request, res: NextApiResponse) => {
  const { email, password } = req.body;

  let logedUser = await user.loginUser(req.db, "users", {
    email,
    password,
  });
  if (!logedUser) {
    logedUser = await user.loginUser(req.db, "employee", {
      email,
      password,
    });
  }

  if (!logedUser)
    return res
      .status(400)
      .json({ error: " المستخدم غير مسجل او كلمة السر غير صحيحة" });
  const token = jwt.sign(
    { id: logedUser._id, type: logedUser.type || null },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      path: "/",
    })
  );
  res.send(logedUser);
});

export default handler;
