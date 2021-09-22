import { useState } from "react";
import FormStepper, { FormikStep } from "./FormStepper";
import { FormItem, Select, DatePicker, InputNumber } from "formik-antd";


import { classes, division, familySituation } from "../../utils/SchoolSubjects";
import { sharedInitialValues } from "./shredInitialValues";
import {
  PersonalFormStep,
  ContactFormStep,
  ImagesFormStep,
} from "./SharedFormStep";
import {
  InfoValidation,
  personalInfoValidation,
  subjectValidation,
} from "./formValidation";
import TextInput from "./TextInput";
const { Option } = Select;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
export default function AddNewStudentForm({
  oldData,
  edit,
  handleEdit,
  handleNew,
  image,
  setImage,
  type,
}) {
  const [isImageLoading, setIsImageLoading] = useState(false);

  const askIfLoading = (state) => {
    setIsImageLoading(state);
  };

  const initialValues = {
    classNumber: oldData?.classNumber || "",
    division: oldData?.division || "",
    familySituation: oldData?.familySituation || "",
    numberOfBrother: oldData?.numberOfBrother || 0,
    healthSituation: oldData?.healthSituation || "",
    sickType: oldData?.sickType || "",
    ...sharedInitialValues(oldData, type),
  };

  return (
    <div>
      <FormStepper
        initialValues={initialValues}
        onSubmit={edit ? handleEdit : handleNew}
      >
        <FormikStep
          label="معلومات شخصية"
          validationSchema={personalInfoValidation}
          loading={isImageLoading}
        >
          <PersonalFormStep layout={layout} />
        </FormikStep>
        <FormikStep
          loading={isImageLoading}
          label="معلومات التواصل"
          // validationSchema={InfoValidation}
        >
          <ContactFormStep layout={layout} noEmail />
        </FormikStep>

        <FormikStep
          label="معلومات الصف"
          validationSchema={subjectValidation}
          loading={isImageLoading}
        >
          <FormItem {...layout} name="classNumber" label="الصف">
            <Select
              dropdownClassName="style"
              allowClear
              placeholder="الرجاء الاختيار"
              name="classNumber"
            >
              {classes?.map((c) => (
                <Option value={c.text} key={c.text}>
                  {c.text}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem {...layout} name="division" label="الشعبة">
            <Select allowClear placeholder="الرجاء الاختيار" name="division">
              {division?.map((d) => (
                <Option value={d.text} key={d.text}>
                  {d.text}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem {...layout} name="dateOfStart" label="تاريخ الالتحاق">
            <DatePicker name="dateOfStart" placeholder="اختر تاريخ" />
          </FormItem>
        </FormikStep>

        <FormikStep label="الوضع الاجتماعي" loading={isImageLoading}>
          <FormItem {...layout} name="healthSituation" label="الوضع الصحي">
            <Select
              allowClear
              placeholder="الرجاء الاختيار"
              name="healthSituation"
            >
              <Option value="معافاة">معافاة</Option>
              <Option value="مريض">مريض</Option>
            </Select>
          </FormItem>
          <TextInput name="sickType" label="نوع المرض" />

          <FormItem {...layout} name="familySituation" label="الوضع العائلي">
            <Select
              allowClear
              placeholder="الرجاء الاختيار"
              name="familySituation"
            >
              {familySituation?.map((d) => (
                <Option value={d.text} key={d.text}>
                  {d.text}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem {...layout} name="numberOfBrother" label="عدد الاخوة">
            <InputNumber name="numberOfBrother" min={0} max={20} />
          </FormItem>
        </FormikStep>
        <FormikStep label="الملحقات" loading={isImageLoading}>
          <ImagesFormStep
            setImage={setImage}
            image={image}
            askIfLoading={askIfLoading}
          ></ImagesFormStep>
        </FormikStep>
      </FormStepper>
    </div>
  );
}
