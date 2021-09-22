import { date, object, string } from "yup";

export const personalInfoValidation = object({
  name: string().required("الرجاء ادخال الاسم"),
  fatherName: string().required("الرجاء ادخال اسم الاب"),
  motherName: string().required("الرجاء ادخال الام"),
  sex: string().required("الرجاء ادخال الجنس"),
});

export const InfoValidation = object({
  plaseOfBirth: string().required("الرجاء ادخال  مكان الولادة"),
  dateOfBirth: date().required("الرجاء ادخال تاريخ الولادة"),
  address: string().required("الرجاء ادخال العنوان "),
  phone: string().required("الرجاء ادخال رقم الهاتف"),
});
export const subjectValidation = object({
  dateOfStart: date().required("الرجاء ادخال تاريخ بدأ العمل"),
});

export const test = {
  plaseOfBirth: string().required("الرجاء ادخال  مكان الولادة"),
  dateOfBirth: date().required("الرجاء ادخال تاريخ الولادة"),
  address: string().required("الرجاء ادخال العنوان "),
  phone: string().required("الرجاء ادخال رقم الهاتف"),
};
