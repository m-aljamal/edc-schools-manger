import Image from "next/image";
export default function ImageSection({ url, name, children }) {
  return (
    <div className="bg-blue-400 flex p-2 items-center ">
      {url ? (
        <Image
          src={url}
          width={220}
          height={220}
          objectFit="cover"
          className=" rounded-full"
        />
      ) : (
        <div className="w-40 h-40 bg-gray-200 rounded-full"></div>
      )}
      <div className=" mr-8">
        <h2 className="text-2xl text-white font-bold">{name}</h2>
        {children}
      </div>
    </div>
  );
}
