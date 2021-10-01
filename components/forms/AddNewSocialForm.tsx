import { Button } from "antd";
import { Formik } from "formik";
import React from "react";
import TextInput from "./TextInput";

export default function AddNewSocialForm() {
  const initialValues = {
    name: "",
    dateOfBerth: "",
    class: "",
    division: "",
    fatherName: "",
    motherName: "",
    familySituation: "",
    fatherDegree: "",
    fatherJob: "",
    motherDegree: "",
    motherJob: "",
    familyCount: "",
    numberOfbrothers: "",
    isFamilyDevided: false,
    isThereHandicapped: false,
    nameofGuardian: "",
    relativeType: "",
    houseType: "",
    rentAmount: "",
    isDisplaced: "",
    numberOfSponsoredKids: "",
    amountOfSponsor: "",
    relativePhoneNumber: "",
    problemType: "",
    problemDescription: "",
    educationStatus: "",
    servicesProvided: "",
    advisorOpinion: "",
    mangerOpinion: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, helpers) => {
        console.log(values);
      }}
    >
      {({ values, errors, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
            <div>

          <TextInput name="name" label="الاسم" autoFocus />
          
          <Button htmlType="submit">حفظ</Button>
            </div>
        </form>
      )}
    </Formik>
  );
}
