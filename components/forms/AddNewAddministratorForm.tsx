import { useState } from "react";
import FormStepper, { FormikStep } from "./FormStepper";
import { FormItem, Select, Input } from "formik-antd";

import { jopTitle } from "../../utils/SchoolSubjects";
import { sharedInitialValues } from "./shredInitialValues";
import {
  PersonalFormStep,
  ContactFormStep,
  JobFormStep,
  ImagesFormStep,
} from "./SharedFormStep";
import {
  test,
  personalInfoValidation,
  subjectValidation,
} from "./formValidation";
import ImageUpload from "../persons/ImageUpload";
import { object, string } from "yup";

const { Option } = Select;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
export default function AddNewAddministratorForm({
  oldData,
  edit,
  handleEdit,
  handleNew,
  image,
  setImage,
  graduateImage,
  setGraduateImage,
  contractImage,
  setContractImage,
  type,
}) {
  const [isImageLoading, setIsImageLoading] = useState(false);

  const askIfLoading = (state) => {
    setIsImageLoading(state);
  };

  const initialValues = {
    password: oldData?.password || "",
    jobTitle: oldData?.jobTitle || "",
    ...sharedInitialValues(oldData, type),
  };

  const validation = object({
    ...test,
    email: string().email().trim().required("الرجاء ادخال الايميل"),
    password: string().trim().required("الرجاء ادخال كلمة السر"),
  });
  return (
    <div>
      <FormStepper
        initialValues={initialValues}
        onSubmit={edit ? handleEdit : handleNew}
      >
        <FormikStep
          label="معلومات شخصية"
          // validationSchema={personalInfoValidation}
          loading={isImageLoading}
        >
          <PersonalFormStep layout={layout} />
        </FormikStep>

        <FormikStep
          loading={isImageLoading}
          label="معلومات التواصل"
          // validationSchema={validation}
        >
          <ContactFormStep layout={layout}>
            <FormItem {...layout} name="password" label="كلمة السر">
              <Input name="password" />
            </FormItem>
          </ContactFormStep>
        </FormikStep>
        <FormikStep
          label="الاختصاص"
          // validationSchema={subjectValidation}
          loading={isImageLoading}
        >
          <JobFormStep layout={layout}>
            <FormItem {...layout} name="jobTitle" label="المسمى الوظيفي">
              <Select
                dropdownClassName="style"
                placeholder="الرجاء الاختيار"
                name="jobTitle"
              >
                {jopTitle?.map((c) => (
                  <Option value={c.text} key={c.text}>
                    {c.text}
                  </Option>
                ))}
              </Select>
            </FormItem>
          </JobFormStep>
        </FormikStep>
        <FormikStep label="الملحقات" loading={isImageLoading}>
          <ImagesFormStep
            setImage={setImage}
            image={image}
            askIfLoading={askIfLoading}
          >
            <FormItem name="image">
              <p>صورة الشهادة الدراسية</p>
              <ImageUpload
                askIfLoading={askIfLoading}
                imageState={graduateImage}
                setImage={setGraduateImage}
              />
            </FormItem>
            <FormItem name="image">
              <p>صورة عقد العمل</p>
              <ImageUpload
                askIfLoading={askIfLoading}
                imageState={contractImage}
                setImage={setContractImage}
              />
            </FormItem>
          </ImagesFormStep>
        </FormikStep>
      </FormStepper>
    </div>
  );
}
