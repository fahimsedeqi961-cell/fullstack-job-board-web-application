export const PrimaryBtn = ({ btnName }) => {
  return (
    <button
      className={`px-6 py-3 bg-blue-600 hover:bg-blue-700  text-sm text-white shadow-lg shadow-indigo-600/20 rounded-xl active:scale-[0.98] font-medium whitespace-nowrap transition-all cursor-pointer `}
    >
      {btnName}
    </button>
  );
};
