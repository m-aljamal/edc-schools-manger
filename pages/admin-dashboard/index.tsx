import { connectToDB, school, user } from "../../db";
import Dashboard from "../../components/layout/dashboard";
const UserDashboard = ({ currentUser, schools }) => {
  return (
    <Dashboard
      currentUser={currentUser}
      userType="admin"
      schools={schools}
      schoolName="مشرف عام"
    />
  );
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
