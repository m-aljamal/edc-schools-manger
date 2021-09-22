export const sharedInitialValues = (oldData, type) => {
  const values = {
    name: oldData?.name || "",
    fatherName: oldData?.fatherName || "",
    motherName: oldData?.motherName || "",
    sex: oldData?.sex || "",
    dateOfBirth: oldData?.dateOfBirth || "",
    plaseOfBirth: oldData?.plaseOfBirth || "",
    address: oldData?.address || "",
    phone: oldData?.phone || "",
    email: oldData?.email || "",
    dateOfStart: oldData?.dateOfStart || "",
    TypeOfCertifcate: oldData?.TypeOfCertifcate || "",
    typeOfDegree: oldData?.typeOfDegree || "",
    DateOfGraduate: oldData?.DateOfGraduate || "",
    busPath: oldData?.busPath || "",
    type,
  };
  return values;
};
