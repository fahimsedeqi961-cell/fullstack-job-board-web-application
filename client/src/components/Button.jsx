export const Button = ({ btnName }) => {
  return (
    <button
      className={`px-6 py-3 bg-indigo-600 hover:bg-indigo-500  text-sm text-white shadow-lg shadow-indigo-600/20 rounded-xl active:scale-[0.98] font-medium whitespace-nowrap transition-all cursor-pointer `}
    >
      {btnName}
    </button>
  );
};
