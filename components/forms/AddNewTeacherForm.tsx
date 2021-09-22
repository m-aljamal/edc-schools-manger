import { useState } from "react";
import FormStepper, { FormikStep } from "./FormStepper";
import { FormItem, Input, Select, TreeSelect } from "formik-antd";
import { classes, division, subjects } from "../../utils/SchoolSubjects";
import { sharedInitialValues } from "./shredInitialValues";
import {
  PersonalFormStep,
  ContactFormStep,
  JobFormStep,
  ImagesFormStep,
} from "./SharedFormStep";
import {
  personalInfoValidation,
  subjectValidation,
  test,
} from "./formValidation";
import ImageUpload from "../persons/ImageUpload";
import { object, string } from "yup";
const { Option } = Select;
const { TreeNode } = TreeSelect;
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
export default function AddNewTeacherForm({
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
    subject: oldData?.subject || [],
    classNumber: oldData?.classNumber || [],
    division: oldData?.division || [],
    classSuperVisor: oldData?.classSuperVisor || "",
    divisionSuperVisor: oldData?.divisionSuperVisor || "",
    ...sharedInitialValues(oldData, type),
  };
  const teacherInfoValidation = object({
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
          // validationSchema={teacherInfoValidation}
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
            <FormItem {...layout} name="subject" label="مدرس لمادة">
              <Select
                mode="multiple"
                allowClear
                placeholder="الرجاء الاختيار"
                name="subject"
              >
                {subjects?.map((s, i) => (
                  <Option key={i} value={s.text}>
                    {s.text}
                  </Option>
                ))}
              </Select>
            </FormItem>
          </JobFormStep>
        </FormikStep>

        <FormikStep label="الصف" loading={isImageLoading}>
          <FormItem {...layout} name="classNumber" label="مدرس لصف ">
            <Select
              mode="multiple"
              dropdownClassName="style"
              allowClear
              placeholder="الرجاء الاختيار"
              name="classNumber"
            >
              {classes?.map((c, i) => (
                <Option value={c.text} key={i}>
                  {c.text}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem {...layout} name="division" label="مدرس لشعبة">
            <TreeSelect
              showSearch
              style={{ width: "100%" }}
              name="division"
              dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
              placeholder="اختار الشعبة"
              allowClear
              multiple
              treeCheckable
              showCheckedStrategy="SHOW_CHILD"
            >
              {classes.map((c) => (
                <TreeNode
                  value={c.value}
                  title={`الصف ${c.text}`}
                  key={c.value}
                >
                  <TreeNode value={` ${c.value} /اولى`} title="شعبة اولى" />
                  <TreeNode value={` ${c.value}/ثانية`} title="شعبة ثانية" />
                  <TreeNode value={` ${c.value}/ثالثة`} title="شعبة ثالثة" />
                  <TreeNode value={` ${c.value}/رابعة`} title="شعبة رابعة" />
                </TreeNode>
              ))}
            </TreeSelect>
          </FormItem>
          <FormItem {...layout} name="classSuperVisor" label="مشرف على صف">
            <Select
              dropdownClassName="style"
              allowClear
              placeholder="الرجاء الاختيار"
              name="classSuperVisor"
            >
              {classes?.map((c, i) => (
                <Option value={c.text} key={i}>
                  {c.text}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem {...layout} name="divisionSuperVisor" label="مشرف على شعبة">
            <Select
              dropdownClassName="style"
              allowClear
              placeholder="الرجاء الاختيار"
              name="divisionSuperVisor"
            >
              {division?.map((c, i) => (
                <Option value={c.text} key={i}>
                  {c.text}
                </Option>
              ))}
            </Select>
          </FormItem>
        </FormikStep>

        <FormikStep label="الملحقات" loading={isImageLoading}>
          <ImagesFormStep
            setImage={setImage}
            image={image}
            askIfLoading={askIfLoading}
          >
            <FormItem name="image">
              <p>صورة الشهادة الدراسية </p>
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
