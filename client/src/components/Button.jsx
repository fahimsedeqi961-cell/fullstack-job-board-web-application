export const Button = ({ btnName }) => {
  return (
    <button
      className={`px-5 py-2 font-bold transition-colors duration-300 cursor-pointer ${btnName === "Login" ? "text-white bg-blue-600 rounded-md hover:bg-blue-500" : "bg-gray-50  rounded-md border border-gray-300 text-gray-800 hover:bg-gray-100"}`}
    >
      {btnName}
    </button>
  );
};
