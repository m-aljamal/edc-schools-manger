import FormItem from "antd/lib/form/FormItem";
import { Formik } from "formik";
import { Form, Input, Select, InputNumber, DatePicker } from "formik-antd";
import { useState } from "react";
import { Button, message } from "antd";
import ImageUpload from "../persons/ImageUpload";
import axios from "axios";
import useSWR, { trigger } from "swr";
import LoadingSpin from "../shared/LoadingSpin";
import { classes } from "../../utils/SchoolSubjects";
const { Option } = Select;

export default function AddSchoolActivite({
  setIsModalVisible,
  setdestroyOnClose,
}) {
  const teachers = useSWR("/api/names/teacher", {
    dedupingInterval: 60000,
  });

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);
  if (teachers.error) {
    console.error(teachers.error);
  }
  if (!teachers.data) {
    return <LoadingSpin />;
  }

  const askIfLoading = (state) => {
    setIsImageLoading(state);
  };
  const initailValues = {
    name: "",
    teachersNames: [],
    namesOfBeneficiaries: [],
    description: "",
    date: "",
    duration: "",
    classNumbers: [],
  };
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 21 },
  };
  const onSubmit = async (values, helpers) => {
    try {
      const res = await axios.post("/api/activities", { ...values, image });
      trigger("/api/activities");
      if (res.status === 200) {
        setLoading(false);
        helpers.resetForm();
        setdestroyOnClose(true);
        message.success(`تم تسجيل النشاط بنجاح`);
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
          <FormItem {...layout} name="name" label="اسم النشاط">
            <Input name="name" autoFocus />
          </FormItem>
          <FormItem {...layout} name="teachersNames" label="اسماء المشرفين">
            <Select
              mode="multiple"
              dropdownClassName="style"
              allowClear
              placeholder="الرجاء الاختيار"
              name="teachersNames"
            >
              {teachers?.data?.map((c) => (
                <Option value={c.name} key={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem {...layout} name="classNumbers" label="الصفوف">
            <Select
              mode="multiple"
              dropdownClassName="style"
              allowClear
              placeholder="الرجاء الاختيار"
              name="classNumbers"
            >
              {classes?.map((c) => (
                <Option value={c.text} key={c.text}>
                  {c.text}
                </Option>
              ))}
            </Select>
          </FormItem>

          <FormItem {...layout} name="duration" label="مدة النشاط">
            <Input name="duration" />
          </FormItem>
          <FormItem
            {...layout}
            name="numberOfBeneficiaries"
            label="عدد المستفيدين"
          >
            <InputNumber name="numberOfBeneficiaries" min={1} />
          </FormItem>
          <FormItem {...layout} name="date" label="تاريخ النشاط">
            <DatePicker name="date" placeholder="تاريخ النشاط" />
          </FormItem>
          <FormItem {...layout} name="description" label="وصف النشاط">
            <Input.TextArea name="description" />
          </FormItem>
          <FormItem name="images" {...layout}>
            <div className="mb-4">
              <p>رفع صورة عن النشاط</p>
              <ImageUpload
                askIfLoading={askIfLoading}
                setImage={setImage}
                imageState={image}
              />
            </div>
          </FormItem>
          <Button
            loading={loading}
            className="text-base bg-blue-400 hover:bg-blue-500"
            htmlType="submit"
            block
            type="primary"
          >
            اضافة النشاط
          </Button>
        </Form>
      )}
    </Formik>
  );
}
