
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {

  const { i18n } = useTranslation();
  
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  }
  return (
    <>
      <select
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="fa">فارسی</option>
        <option value="pa">پشتو</option>
      </select>
    </>
  )
}

export default LanguageSwitcher;