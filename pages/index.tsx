import axios from "axios";
import Router from "next/router";
import { useState } from "react";
import { Form, Formik } from "formik";
import { FormItem, Input } from "formik-antd";
import { string, object } from "yup";
import { Button, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { connectToDB, user } from "../db";

const login = ({ currentUser }) => {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };
  const validationScheam = object({
    email: string().required("يجب عليك ادخال اﻹيميل"),
    password: string().required("يجب عليك ادخال كلمة السر"),
  });

  return (
    <section className="absolute w-full h-full">
      <div
        className="absolute top-0 w-full h-full bg-gray-900"
        style={{
          background: "linear-gradient(to right, #bdc3c7, #2c3e50)",
        }}
      ></div>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-gray-600 text-1xl font-bold">
                    تسجيل الدخول
                  </h6>
                </div>

                <hr className="mt-6 border-b-1 border-gray-400" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <Formik
                  validationSchema={validationScheam}
                  initialValues={initialValues}
                  onSubmit={async (values, formikHelpers) => {
                    setLoading(true);
                    try {
                      const res = await axios.post("/api/users/login", values);
                      if (res.status === 200) {
                        setLoading(false);
                        if (res.data && res.data.isAdmin) {
                          Router.push("/admin-dashboard");
                        } else {
                          Router.push(
                            `/dashboard/${
                              res.data.type === "teacher"
                                ? "teacher"
                                : res.data.isAdmin === false
                                ? "user"
                                : res.data.jobTitle
                            }`
                          );
                        }
                      }
                    } catch (error) {
                      setLoading(false);
                      message.error(error.response.data.error);
                    }
                  }}
                >
                  <Form>
                    <FormItem name="email">
                      <Input
                        prefix={
                          <MailOutlined className="site-form-item-icon ml-4" />
                        }
                        name="email"
                        placeholder="اﻹيميل"
                      />
                    </FormItem>
                    <FormItem name="password">
                      <Input.Password
                        autoComplete="off"
                        prefix={
                          <LockOutlined className="site-form-item-icon ml-4" />
                        }
                        name="password"
                        placeholder="كلمة السر"
                      />
                    </FormItem>
                    <button
                      className="bg-gray-900 text-xl text-white active:bg-gray-700  font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                      type="submit"
                      style={{ transition: "all .15s ease" }}
                    >
                      دخول
                    </button>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default login;
// export const getServerSideProps = async (ctx) => {
//   if (
//     !ctx.req?.cookies?.auth_token ||
//     ctx.req?.cookies?.auth_token !== "logout"
//   ) {
//     ctx.res.writeHead(302, { Location: "/dashboard" });
//     ctx.res.end();
//   }
//   return { props: {} };
// };
