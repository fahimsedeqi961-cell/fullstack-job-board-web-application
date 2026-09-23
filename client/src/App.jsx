import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Jobs from "./pages/Jobs.jsx";
import JobDetails from "./pages/JobDetails.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
function App() {
  // useEffect(() => {
  //   const isRTL = i18n.language === "fa" || i18n.language === "pa";

  //   document.documentElement.dir = isRTL ? "rtl" : "ltr";
  //   document.documentElement.lang = i18n.language
  // }, [i18n.language]);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/findjobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
