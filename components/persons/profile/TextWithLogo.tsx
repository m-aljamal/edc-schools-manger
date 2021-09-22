export default function TextWithLogo({ logo, text }) {
  return (
    <div className="flex items-center gap-2">
      <i className={`${logo} text-gray-700 fa-lg`}></i>
      <p className="text-gray-600 font-bold  text-base">{text}</p>
    </div>
  );
}
