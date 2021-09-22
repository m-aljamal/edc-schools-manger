import React, { useState } from "react";
import { Formik } from "formik";
import { FormItem, Input, Radio, Form, DatePicker } from "formik-antd";
import { Button, message } from "antd";
import axios from "axios";
import { trigger } from "swr";
import DateSelect from "../forms/DateSelect";
export default function AddUserForm({ setIsModalVisible, setdestroyOnClose }) {
  const [loading, setLoading] = useState(false);
  const initailValues = {
    name: "",
    email: "",
    password: "",
    isAdmin: false,
    schoolName: "",
    firstTermSchoolDate: "",
    secoundTermSchoolDate: "",
    thirdTermSchoolDate: "",
  };
  const onSubmit = async (values, helpers) => {
 
    // try {
    //   setLoading(true);
    //   const res = await axios.post("/api/users/new", {
    //     ...values,
    //   });
    //   trigger("/api/users/allusers");
    //   if (res.status === 200) {
    //     setLoading(false);
    //     helpers.resetForm();
    //     setdestroyOnClose(true);
    //     message.success(`تم انشاء الحساب بنجاح`);
    //     setIsModalVisible(false);
    //   }
    // } catch (error) {
    //   setLoading(false);
    //   message.error(error.response.data.error);
    // }
  };
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 21 },
  };

  return (
    <Formik onSubmit={onSubmit} initialValues={initailValues}>
      {({ values, errors, isSubmitting, isValidating }) => (
        <Form {...layout}>
          <FormItem name="name" label="الاسم الكامل">
            <Input name="name" autoFocus />
          </FormItem>
          <FormItem name="email" label="الايميل">
            <Input name="email" />
          </FormItem>
          <FormItem name="password" label="كلمة السر">
            <Input name="password" />
          </FormItem>
          <FormItem name="isAdmin" label="نوع الحساب">
            <Radio.Group name="isAdmin">
              <Radio name="isAdmin" value={true}>
                مشرف عام
              </Radio>
              <Radio name="isAdmin" value={false}>
                مشرف على مدرسة
              </Radio>
            </Radio.Group>
          </FormItem>
          {!values.isAdmin && (
            <div>
              <FormItem name="schoolName" label="اسم المدرسة">
                <Input name="schoolName" />
              </FormItem>
              <FormItem label="الفصل الاول" name="firstTermSchoolDateStart">
                <DatePicker.RangePicker name="firstTermSchoolDateStart" />
              </FormItem>
              <FormItem label="الفصل الثاني" name="secoundTermSchoolDate">
                <DatePicker.RangePicker name="secoundTermSchoolDate" />
              </FormItem>
              <FormItem label="الفصل الثالث" name="thirdTermSchoolDate">
                <DatePicker.RangePicker name="thirdTermSchoolDate" />
              </FormItem>
            </div>
          )}
          <Button
            loading={loading}
            className="text-base bg-blue-400 hover:bg-blue-500"
            htmlType="submit"
            block
            type="primary"
            disabled={
              loading ||
              isSubmitting ||
              isValidating ||
              !values.password ||
              !values.name ||
              !values.email
            }
          >
            تسجيل
          </Button>
        </Form>
      )}
    </Formik>
  );
}
