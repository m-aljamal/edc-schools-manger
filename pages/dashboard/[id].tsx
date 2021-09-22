import React from "react";
import { useRouter } from "next/router";
import Dashboard from "../../components/layout/dashboard";
import { connectToDB, school, user } from "../../db";
import LoadingSpin from "../../components/shared/LoadingSpin";
export default function dashboard({ currentUser, schoolName }) {
  const router = useRouter();
  const userType = router.query.id;

  if (!userType) {
    return <LoadingSpin />;
  }
  return (
    <Dashboard
      currentUser={currentUser}
      userType={userType}
      schools={null}
      schoolName={schoolName}
    />
  );
}

export const getServerSideProps = async (ctx) => {
  const { db } = await connectToDB();

  if (
    !ctx.req?.cookies?.auth_token ||
    ctx.req?.cookies?.auth_token === "logout"
  ) {
    ctx.res.writeHead(302, { Location: "/" });
    ctx.res.end();
  }
  const props: any = {};

  let currentUser = null;
  let schoolName = null;
  currentUser = await user.getLogedUser(db, ctx.req.cookies.auth_token);

  if (currentUser) {
    props.currentUser = currentUser;
    schoolName = await school.getSchoolById(db, currentUser.schoolId);
    if (!schoolName) {
      schoolName = await school.getSchoolByDirector(db, currentUser._id);
    }
  }
  props.schoolName = schoolName;
  return { props };
};
