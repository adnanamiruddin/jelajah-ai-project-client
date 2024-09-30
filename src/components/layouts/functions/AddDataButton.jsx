import { IoMdAdd } from "react-icons/io";

export default function AddDataButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="bg-gradient-to-br from-green-800 to-green-400 text-white py-2 px-4 font-semibold rounded-md flex items-center hover:brightness-110"
    >
      <IoMdAdd className={`text-2xl ${children ? "me-2" : ""}`} /> {children}
    </button>
  );
}
