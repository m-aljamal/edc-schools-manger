import FormItem from "antd/lib/form/FormItem";
import { Formik } from "formik";
import { Form, Input, Select, InputNumber, DatePicker } from "formik-antd";
import { useState } from "react";
import { Button, message } from "antd";
import {
  booksLevel,
  booksTypes,
  schoolAssets,
} from "../../utils/SchoolSubjects";
import axios from "axios";
import { trigger } from "swr";

const { Option } = Select;

export default function AddBookToLibrary({
  setIsModalVisible,
  setdestroyOnClose,
}) {
  const [loading, setLoading] = useState(false);

  const initailValues = {
    name: "",
    type: "",
    quantity: "",
    level: "",
  };
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 21 },
  };
  const onSubmit = async (values, helpers) => {
    try {
      const res = await axios.post("/api/library", { ...values });
      trigger("/api/library");
      if (res.status === 200) {
        setLoading(false);
        helpers.resetForm();
        setdestroyOnClose(true);
        message.success(`تم تسجيل الكتاب بنجاح`);
        setIsModalVisible(false);
      }
    } catch (error) {
      message.error(error.response.data.error);
    }
  };
  return (
    <Formik onSubmit={onSubmit} initialValues={initailValues}>
      {({ values }) => (
        <Form>
          <FormItem {...layout} name="name" label="اسم الكتاب">
            <Input name="name" autoFocus />
          </FormItem>
          <FormItem {...layout} name="type" label="نوع الكتاب">
            <Select allowClear placeholder="الرجاء الاختيار" name="type">
              {booksTypes.map((s, i) => (
                <Option key={i} value={s.text}>
                  {s.text}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem {...layout} name="level" label="مستوى الكتاب">
            <Select allowClear placeholder="الرجاء الاختيار" name="level">
              {booksLevel.map((s, i) => (
                <Option key={i} value={s.text}>
                  {s.text}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem {...layout} name="quantity" label="العدد">
            <InputNumber name="quantity" />
          </FormItem>

          <Button
            loading={loading}
            className="text-base bg-blue-400 hover:bg-blue-500"
            htmlType="submit"
            block
            type="primary"
            // disabled={
            //   loading ||
            //   isSubmitting ||
            //   isValidating ||
            //   !values.password ||
            //   !values.name ||
            //   !values.email
            // }
          >
            اضافة كتاب
          </Button>
        </Form>
      )}
    </Formik>
  );
}
