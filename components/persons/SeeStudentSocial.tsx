import React, { useEffect, useState } from "react";
import useSWR from "swr";
import LoadingSpin from "../shared/LoadingSpin";

export default function SeeStudentSocial({ student }) {
  const res = useSWR(`/api/socialForm/find/${student._id}`);

  if (res.error) {
    return <p>لايوجد استمارة لهذا الطالب</p>;
  }

  if (!res.data) {
    return <LoadingSpin />;
  }

  const {
    advisorOpinion,
    amountOfSponsor,
    studentName,
    servicesProvided,
    fatherDegree,
    fatherJob,
    motherDegree,
    motherJob,
    familyCount,
    isFamilyDevided,
    houseType,
    isDisplaced,
    isThereHandicapped,
    rentAmount,
    nameofGuardian,
    relativeType,
    relativePhoneNumber,
    numberOfSponsoredKids,
    educationStatus,
    problemType,
    problemDescription,
    mangerOpinion,
  } = res.data;

  return (
    <>
      {res.data === "لايوجد استمارة لهاذا الطالب" ? (
        <p className="text-xl text-red-500">لايوجد استمارة لهاذا الطالب</p>
      ) : (
        <div>
          <Info title="الاسم " text={studentName} />
          <Info title="المستوى الثقافي للأب" text={fatherDegree} />
          <Info title="عمل الأب" text={fatherJob} />
          <Info title="المستوى الثقافي للأم " text={motherDegree} />
          <Info title="عمل الأم" text={motherJob} />
          <Info title="عدد أفراد الأسرة" text={familyCount} />
          <Info title="الوالدان منفصلان" text={isFamilyDevided} />
          <Info title="نوع السكن" text={houseType} />
          <Info title="مبلغ الإيجار" text={rentAmount} />
          <Info title="الأسرة من أبناء البلدة أم نازحة" text={isDisplaced} />
          <Info title="هل يوجد معاق في الأسرة" text={isThereHandicapped} />
          <Info title="اسم ولي الأمر" text={nameofGuardian} />
          <Info title="صلة القرابة" text={relativeType} />
          <Info title="هاتف ولي الأمر " text={relativePhoneNumber} />
          <Info
            title="عدد الأطفال المكفولين في الأسرة "
            text={numberOfSponsoredKids}
          />
          <Info title="مبلغ الكفالة " text={amountOfSponsor} />
          <Info title="وضع الطالب دراسياً" text={educationStatus} />
          <Info title="أبرز الخدمات المقدمة للطالب " text={servicesProvided} />
          <Info title="مشكلة الطالب " text={problemType} />
          <Info title="شرح مشكلة الطالب" text={problemDescription} />
          <Info title="رأي المرشد الطلابي" text={advisorOpinion} />
          <Info title="رأي مدير المدرسة" text={mangerOpinion} />
        </div>
      )}
    </>
  );
}

const Info = ({ title, text }) => {
  return (
    <div className="flex gap-3 text-lg">
      <h2 className="text-blue-800">{title}:</h2>
      <p>{text}</p>
    </div>
  );
};
