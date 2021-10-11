import { message } from "antd";
import axios from "axios";
import { FormItem, InputNumber, Select, Input } from "formik-antd";
import React, { useState } from "react";
import { trigger } from "swr";
import { typeOfCertifcate } from "../../utils/SchoolSubjects";
import FormStepper, { FormikStep } from "../forms/FormStepper";
import TextInput from "../forms/TextInput";
const { Option } = Select;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

export default function SocialForm({
  type,
  id,
  name,
  closeForm,
  oldData,
  edit,
}) {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    fatherDegree: oldData?.fatherDegree || "",
    motherDegree: oldData?.motherDegree || "",
    fatherJob: oldData?.fatherJob || "",
    motherJob: oldData?.motherJob || "",
    familyCount: oldData?.familyCount || "",
    isFamilyDevided: oldData?.isFamilyDevided || "",
    isThereHandicapped: oldData?.isThereHandicapped || "",
    nameofGuardian: oldData?.nameofGuardian || "",
    relativeType: oldData?.relativeType || "",
    houseType: oldData?.houseType || "",
    rentAmount: oldData?.rentAmount || "",
    isDisplaced: oldData?.isDisplaced || "",
    numberOfSponsoredKids: oldData?.numberOfSponsoredKids || "",
    amountOfSponsor: oldData?.amountOfSponsor || "",
    relativePhoneNumber: oldData?.relativePhoneNumber || "",
    problemType: oldData?.problemType || "",
    problemDescription: oldData?.problemDescription || "",
    educationStatus: oldData?.educationStatus || "",
    servicesProvided: oldData?.servicesProvided || "",

    advisorOpinion: oldData?.advisorOpinion || "",

    mangerOpinion: oldData?.mangerOpinion || "",
  };

  const handleSubmit = async (values, helpers) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/socialForm", {
        ...values,
        studentName: name,
        studentId: id,
      });
      if (res.status === 200) {
        setLoading(false);
        helpers.resetForm();
        trigger(`/api/socialForm/find/${id}`);
        closeForm();
        message.success("تم انشاء الاستمارة بنجاح");
      }
    } catch (error) {
      setLoading(false);
      message.error(error.response.data.error);
    }
  };
  const handleEdit = async (values, helpers) => {
    setLoading(true);

    try {
      const res = await axios.put("/api/socialForm", {
        values,
        _id: oldData._id,
      });
      if (res.status === 200) {
        trigger(`/api/socialForm/find/${id}`);
        setLoading(false);
        helpers.resetForm();
        closeForm();
        message.success("تم تعديل الاستمارة بنجاح");
      }
    } catch (error) {
      setLoading(false);
      message.error(error.response.data.error);
    }
  };
  return (
    <FormStepper
      initialValues={initialValues}
      onSubmit={edit ? handleEdit : handleSubmit}
    >
      <FormikStep label="" validationSchema={null} loading={false}>
        <SelectWithOptions
          label="المستوى الثقافي للأب"
          name="fatherDegree"
          options={typeOfCertifcate.map((t) => t.text)}
        />
        <TextInput name="fatherJob" label="عمل الأب" />
        <SelectWithOptions
          label="المستوى الثقافي للأم"
          name="motherDegree"
          options={typeOfCertifcate.map((t) => t.text)}
        />
        <TextInput name="motherJob" label="عمل الأم" />

        <YesNoOptions label="الوالدان منفصلان" name="isFamilyDevided" />
        <FormItem {...layout} name="familyCount" label="عدد أفراد الأسرة">
          <InputNumber name="familyCount" min={0} max={50} />
        </FormItem>
      </FormikStep>

      {/* address info */}
      <FormikStep label="" validationSchema={null} loading={false}>
        <TextInput name="nameofGuardian" label="اسم ولي الأمر" />
        <TextInput name="relativePhoneNumber" label="هاتف ولي الأمر" />

        <TextInput name="relativeType" label="صلة القرابة" />

        <YesNoOptions
          label="هل يوجد معاق في الأسرة"
          name="isThereHandicapped"
        />
        <FormItem
          name="numberOfSponsoredKids"
          label="عدد الأطفال المكفولين"
          {...layout}
        >
          <InputNumber name="numberOfSponsoredKids" min={0} max={50} />
        </FormItem>

        <FormItem {...layout} name="amountOfSponsor" label="مبلغ الكفالة">
          <InputNumber name="amountOfSponsor" min={0} max={50000} />
        </FormItem>
      </FormikStep>
      <FormikStep label="" validationSchema={null} loading={false}>
        <SelectWithOptions
          label="وضع الطالب دراسياً"
          name="educationStatus"
          options={["ممتاز ", "جيد", "متوسط", "ضعيف", "فاقد تعليمياً"]}
        />
        <FormItem
          {...layout}
          label="أبرز الخدمات المقدمة للطالب"
          name="servicesProvided"
        >
          <Input.TextArea name="servicesProvided" />
        </FormItem>

        <SelectWithOptions
          label="الأسرة من أبناء البلدة أم نازحة"
          name="isDisplaced"
          options={["مقيم", "نازح"]}
        />
        <SelectWithOptions
          label="نوع السكن"
          name="houseType"
          options={["ملك", "هبة", "آجار", "خيمة"]}
        />
        <FormItem {...layout} name="rentAmount" label=" مبلغ الإيجار ليرة تركي">
          <InputNumber name="rentAmount" min={0} max={50000} />
        </FormItem>
      </FormikStep>

      <FormikStep label="" validationSchema={null} loading={false}>
        <SelectWithOptions
          label="مشكلة الطالب"
          name="problemType"
          options={["نفسية", "اجتماعية", "صحية ", "لايوجد"]}
        />
        <FormItem {...layout} label="رأي المرشد الطلابي" name="advisorOpinion">
          <Input.TextArea name="advisorOpinion" />
        </FormItem>
        <FormItem {...layout} label="رأي مدير المدرسة" name="mangerOpinion">
          <Input.TextArea name="mangerOpinion" />
        </FormItem>
        <FormItem
          {...layout}
          label="شرح مشكلة الطالب "
          name="problemDescription"
        >
          <Input.TextArea name="problemDescription" />
        </FormItem>
      </FormikStep>
    </FormStepper>
  );
}

const YesNoOptions = ({ label, name }) => {
  return (
    <FormItem {...layout} name={name} label={label}>
      <Select
        dropdownClassName="style"
        allowClear
        placeholder="الرجاء الاختيار"
        name={name}
      >
        <Option value="نعم" key="نعم">
          نعم
        </Option>
        <Option value="لا" key="لا">
          لا
        </Option>
      </Select>
    </FormItem>
  );
};

const SelectWithOptions = ({ label, name, options = [] }) => {
  return (
    <FormItem {...layout} name={name} label={label}>
      <Select
        dropdownClassName="style"
        allowClear
        placeholder="الرجاء الاختيار"
        name={name}
      >
        {options.map((o) => (
          <Option value={o} key={o}>
            {o}
          </Option>
        ))}
      </Select>
    </FormItem>
  );
};
