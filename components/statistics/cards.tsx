export default function cards({
  students,
  employees,
  employeeGender,
  studentsGender,
}) {
  return (
    <div>
      <div className="flex flex-wrap">
        <SingleCard
          data={students}
          genders={{ gendersArray: studentsGender, type: "students" }}
        />
        {employees?.map((em) => (
          <SingleCard
            data={em}
            key={em._id.type}
            genders={{ gendersArray: employeeGender, type: "employees" }}
          />
        ))}
      </div>
    </div>
  );
}

const SingleCard = ({ data, genders }) => {
  const findGender = (type: string) => {
    if (type === "students") {
      return genders.gendersArray.map((g, i) => (
        <GenderComponent sex={g._id.sex} total={g.total} key={i} />
      ));
    }
    return genders.gendersArray
      .filter((g) => g._id.type === type)
      .map((g, i) => (
        <GenderComponent sex={g._id.sex} total={g.total} key={i} />
      ));
  };
  const words = {
    teacher: {
      text: "مدرس",
      icon: <i className="fas fa-chalkboard-teacher"></i>,
      color: "bg-red-500",
      gender: findGender("teacher"),
    },
    administrators: {
      text: "اداري",
      icon: <i className="fas fa-users-cog"></i>,
      color: "bg-blue-500",
      gender: findGender("administrators"),
    },
    services: {
      text: "مستخدم",
      icon: <i className="fas fa-broom"></i>,
      color: "bg-yellow-700",
      gender: findGender("services"),
    },
    students: {
      text: "طالب",
      icon: <i className="fas fa-user-graduate"></i>,
      color: "bg-pink-500",
      gender: findGender("students"),
    },
  };

  return (
    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h5 className="text-gray-500 font-bold text-base">
                {words[data?._id.type].text}
              </h5>
              <span className="font-semibold text-xl text-blueGray-700">
                {data.total}
              </span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <div
                className={`text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ${
                  words[data?._id.type].color
                }`}
              >
                {words[data?._id.type].icon}
              </div>
            </div>
          </div>
          <div className="flex">{words[data?._id.type].gender}</div>
        </div>
      </div>
    </div>
  );
};

const GenderComponent = ({ total, sex }) => {
  return (
    <div
      className={`flex ml-4 items-center
    ${sex !== "ذكر" ? "text-pink-700" : "text-blue-700"}
    `}
    >
      <p className="ml-2">{total}</p>
      <p>{sex}</p>
    </div>
  );
};
