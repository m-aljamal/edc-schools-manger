import UserDropdown from "./userDropdown";

export default function Navbar({ currentUser, schoolName }) {
  return (
    <>
      <nav className=" md:bg-blue-400 md:shadow-lg  top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="  w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          <p className="text-white  md:text-xl uppercase hidden md:inline-block font-semibold">
            {schoolName?.name}
          </p>
          <UserDropdown currentUser={currentUser} />
        </div>
      </nav>
    </>
  );
}
