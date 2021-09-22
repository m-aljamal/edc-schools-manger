import FormItem from "antd/lib/form/FormItem";
import { Formik } from "formik";
import { Form, Input, Select, InputNumber, DatePicker } from "formik-antd";
import { useState } from "react";
import { Button, message } from "antd";
import { schoolAssets } from "../../utils/SchoolSubjects";
import ImageUpload from "../persons/ImageUpload";
import axios from "axios";
import { trigger } from "swr";

const { Option } = Select;

export default function AddSchoolAssets({
  setIsModalVisible,
  setdestroyOnClose,
}) {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);
  const askIfLoading = (state) => {
    setIsImageLoading(state);
  };
  const initailValues = {
    name: "",
    type: "",
    quantity: "",
    dateOfBay: "",
    priceOfBay: "",
    serialNumber: "",
  };
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 21 },
  };
  const onSubmit = async (values, helpers) => {
    try {
      const res = await axios.post("/api/schoolAssets", { ...values, image });
      trigger("/api/schoolAssets");
      if (res.status === 200) {
        setLoading(false);
        helpers.resetForm();
        setdestroyOnClose(true);
        message.success(`تم تسجيل المادة بنجاح`);
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
          <FormItem {...layout} name="name" label="اسم المادة">
            <Input name="name" autoFocus />
          </FormItem>
          <FormItem {...layout} name="type" label="نوع المادة">
            <Select allowClear placeholder="الرجاء الاختيار" name="type">
              {schoolAssets.map((s, i) => (
                <Option key={i} value={s.text}>
                  {s.text}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem {...layout} name="quantity" label="العدد">
            <InputNumber name="quantity" />
          </FormItem>
          <FormItem {...layout} name="priceOfBay" label="سعر الشراء">
            <InputNumber
              name="priceOfBay"
              formatter={(value) =>
                `${value} $`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
            />
          </FormItem>
          <FormItem {...layout} name="dateOfBay" label="تاريخ الشراء">
            <DatePicker name="dateOfBay" placeholder="تاريخ الشراء" />
          </FormItem>
          <FormItem {...layout} name="serialNumber" label="الرقم التسلسلي">
            <Input name="serialNumber" />
          </FormItem>

          <FormItem name="images">
            <div className="mb-4">
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
            // disabled={
            //   loading ||
            //   isSubmitting ||
            //   isValidating ||
            //   !values.password ||
            //   !values.name ||
            //   !values.email
            // }
          >
            اضافة المادة
          </Button>
        </Form>
      )}
    </Formik>
  );
}
