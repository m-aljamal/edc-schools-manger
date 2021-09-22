const Folder = ({ name, setShowFiles, id }) => {
  return (
    <div>
      <i
        onClick={() => setShowFiles({ show: true, id, name })}
        className="fas fa-folder fa-3x text-gray-500 hover:text-gray-800 cursor-pointer"
      ></i>
      <p className=" overflow-hidden">{name}</p>
    </div>
  );
};

export default Folder;
