import { user, school } from "../db";

export default async (req, res, next) => {
  if (!req.cookies.auth_token)
    return res.status(401).json({ error: "You need to login first" });
  const foundUser = await user.getLogedUser(req.db, req.cookies.auth_token);

  if (foundUser) {
    let userSchool = await school.getSchoolByDirector(req.db, foundUser?._id);
    if(!userSchool){
       userSchool = await school.getSchoolById(req.db, foundUser?.schoolId);
    }
    req.user = foundUser;
    req.userSchool = foundUser?.isAdmin ? req.headers.schoolid : userSchool?._id;
    req.driveFileId = foundUser?.isAdmin ? "0AKK2FEcg3f53Uk9PVA" : userSchool.driveFileId
    next();
  } else {
    // Not Signed in
    return res.status(401).json({ error: "You need to login first" });
  }
};
