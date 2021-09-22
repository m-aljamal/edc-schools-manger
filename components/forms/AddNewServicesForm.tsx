import { useState } from "react";
import FormStepper, { FormikStep } from "./FormStepper";
import { FormItem, Select } from "formik-antd";
import ImageUpload from "../persons/ImageUpload";
import { serviceJopTitle } from "../../utils/SchoolSubjects";
import { sharedInitialValues } from "./shredInitialValues";
import {
  PersonalFormStep,
  ContactFormStep,
  JobFormStep,
  ImagesFormStep,
} from "./SharedFormStep";
import {
  InfoValidation,
  personalInfoValidation,
  subjectValidation,
} from "./formValidation";

const { Option } = Select;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
export default function AddNewServicesForm({
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
    jobTitle: oldData?.jobTitle || "",
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
          label="الاختصاص"
          validationSchema={subjectValidation}
          loading={isImageLoading}
        >
          <JobFormStep layout={layout} serviceForm>
            <FormItem {...layout} name="jobTitle" label="المسمى الوظيفي">
              <Select
                dropdownClassName="style"
                placeholder="الرجاء الاختيار"
                name="jobTitle"
              >
                {serviceJopTitle?.map((c) => (
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
            graduateImage={graduateImage}
            setGraduateImage={setGraduateImage}
            contractImage={contractImage}
            setContractImage={setContractImage}
          >
            <div>
              <p>صورة عقد العمل</p>
              <ImageUpload
                askIfLoading={askIfLoading}
                imageState={contractImage}
                setImage={setContractImage}
              />
            </div>
          </ImagesFormStep>
        </FormikStep>
      </FormStepper>
    </div>
  );
}
