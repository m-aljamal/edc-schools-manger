import { user, school } from "../db";

export default async (req, res, next) => {
  if (!req.cookies.auth_token)
    return res.status(401).json({ error: "You need to login first" });
  const foundUser = await user.getLogedUser(req.db, req.cookies.auth_token);

  if (foundUser) {
    req.user = foundUser;
    next();
  } else {
    // Not Signed in
    return res.status(401).json({ error: "You need to login first" });
  }
};
