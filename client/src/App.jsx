import { useContext } from "react";
import { ThemeContext } from "../src/context/themeContext.jsx"
import LanguageSwitcher from "./components/languageSwitcher.jsx";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function App() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const direction = i18n.language === "en" ? "ltr" : "rtl";

    document.documentElement.dir = direction;
    document.documentElement.lang = i18n.language
  }, [i18n.language]);

  return (
    <>
      <LanguageSwitcher />
      <div
        onClick={toggleTheme}
        className="w-full h-screen bg-white dark:bg-slate-900 text-gray-500 ">
        <h1 className="text-6xl font-bold text-gray-800 dark:text-red-500 text-center mt-50 mx-30">Job Board fullStack (MERN) Project </h1>
        <h1>{t("wellcome")}</h1>
        <p>{t("home")}</p>
        <p>{t("jobs")}</p>
        <p>{t("login")}</p>
      </div>
    </>
  )
}

export default App;