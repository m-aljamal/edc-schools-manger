import ImageSection from "./ImageSection";
import TextWithDate from "./TextWithDate";
import TextWithLogo from "./TextWithLogo";
export default function TeacherProfile({ data }) {
  console.log(data);
  // ​
  // ​
  // ​
  // address: "حلب الاتارب"
  // ​
  // busPath: "حول المدرسة"
  // ​
  //  ​
  // classSuperVisor: "الأول"
  // ​
  // contractImage: Object { public_id: "IYGc6gs7jwLAvDEIcT4qU", url: "https://res.cloudinary.com/dqoung1wz/image/upload/v1630584108/IYGc6gs7jwLAvDEIcT4qU.jpg" }
  // ​
  // ​
  // ​
  //  ​
  // divisionSuperVisor: "الثانية"
  // ​
  // email: "mmm@m.com"
  // ​
  //  ​
  // graduateImage: Object { public_id: "MFczMWJu6ggiNBFOxI-Qb", url: "https://res.cloudinary.com/dqoung1wz/image/upload/v1630584105/MFczMWJu6ggiNBFOxI-Qb.jpg" }
  // ​
  // image: Object { public_id: "MUCaPR0oxahmeP1sVnXxt", url: "https://res.cloudinary.com/dqoung1wz/image/upload/v1630577764/MUCaPR0oxahmeP1sVnXxt.jpg" }
  // ​
  //  ​
  //  ​
  // password: "123"
  // ​
  // phone: "55564545"
  // ​
  //  ​
  // schoolId: "wdABH1vIrJLLbqriq5hqA"
  // ​

  // ​
  // subject: Array [ "رياضيات", "علوم" ]
  // ​

  // ​
  return (
    <div>
      <ImageSection url={data.image.url} name={data?.name}>
        <div className="text-lg text-white mt-1">
          <p className="inline-block ml-1 font-bold ">الصف: </p>
          {data.classNumber.map((c) => (
            <h2 className=" inline-block ml-2 text-white"> {c} </h2>
          ))}
        </div>
        <div>
          <p className="inline-block text-white font-bold text-lg">الشعبة:</p>
          {data.division.map((d) => (
            <h2 className="text-lg text-white  mt-1">{d}</h2>
          ))}
        </div>
      </ImageSection>
      <div className="p-3 flex justify-evenly">
        <div>
          <p className="profileText">اسم الأب: {data?.fatherName}</p>
          <p className="profileText">اسم الام: {data?.motherName}</p>
          <p className="profileText">مكان الولادة: {data?.plaseOfBirth}</p>
          <p className="profileText">
            الدرجة العلمية: {data?.TypeOfCertifcate}
          </p>
          <TextWithDate text="تاريخ الولادة: " date={data?.dateOfBirth} />
          <TextWithDate text="تاريخ البدأ: " date={data?.dateOfStart} />
          <TextWithDate text="تاريخ التخرج: " date={data?.DateOfGraduate} />
          <TextWithLogo text={data?.address} logo="fas fa-map-marker-alt " />
          <TextWithLogo text={data?.phone} logo="fas fa-phone " />

          <p className="profileText">الجنس: {data?.sex}</p>
          <p className="profileText">الاختصاص: {data?.typeOfDegree}</p>
          <div>
            <p className="inline-block text-white font-bold text-lg">
              مدرسة لمادة:
            </p>
            {/* {data?.subject.map((s) => (
              <p className="text-lg text-white mt-1">{s}</p>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}
