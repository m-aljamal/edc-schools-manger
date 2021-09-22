import TextWithLogo from "./TextWithLogo";
import ShowDate from "../../shared/ShowDate";
import ImageSection from "./ImageSection";
export default function StudentProfile({ data }) {
  return (
    <div>
      <ImageSection url={data.image.url} name={data?.name}>
        <h2 className="text-lg text-white font-bold mt-1">
          الصف {data?.classNumber}
        </h2>
        <h2 className="text-lg text-white font-bold mt-1">
          الشعبة {data?.division}
        </h2>
      </ImageSection>

      <div className="p-3 flex justify-evenly">
        <div>
          <p className="profileText">اسم الأب: {data?.fatherName}</p>
          <p className="profileText">اسم الام: {data?.motherName}</p>
          <p className="profileText">الحالة الصحية: {data?.healthSituation}</p>
          <p className="profileText">
            الوضع الإجتماعي: {data?.familySituation}
          </p>
          <TextWithLogo text={data?.address} logo="fas fa-map-marker-alt " />
        </div>
        <div>
          <p className="profileText">الجنس: {data?.sex}</p>
          <p className="profileText">عدد الإخوة: {data?.numberOfBrother}</p>
          <div className="flex  gap-1 items-center">
            <p className="profileText"> تاريخ الولادة: </p>
            <ShowDate date={data?.dateOfBirth} />
          </div>
          <div className="flex gap-1 items-center">
            <p className="profileText"> تاريخ الانضمام: </p>
            <ShowDate date={data?.dateOfStart} />
          </div>
          <TextWithLogo text={data?.phone} logo="fas fa-phone " />
        </div>
      </div>
    </div>
  );
}
