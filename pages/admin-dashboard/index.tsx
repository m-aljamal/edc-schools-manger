import { connectToDB, school, user } from "../../db";
import Dashboard from "../../components/layout/dashboard";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
const UserDashboard = ({ currentUser, schools }) => {
  console.log(currentUser);
  const { addUserName, addSchoolName } = useAuth();
  useEffect(() => {
    addSchoolName("مشرف عام");
    addUserName(currentUser.name);
  }, [addUserName, addSchoolName]);
  return <Dashboard userType="admin" schools={schools} />;
};

export default UserDashboard;

export async function getServerSideProps(ctx) {
  const { db } = await connectToDB();

  const props: any = {};

  if (
    ctx.req?.cookies?.auth_token &&
    ctx.req?.cookies?.auth_token !== "logout"
  ) {
    props.currentUser = await user.getLogedUser(db, ctx.req.cookies.auth_token);
    if (!props?.currentUser?.isAdmin) {
      ctx.res.writeHead(302, { Location: "/dashboard" });
      ctx.res.end();
    }
  } else {
    ctx.res.writeHead(302, { Location: "/" });
    ctx.res.end();
  }

  props.schools = await school.getSchools(db);

  return {
    props,
  };
}
