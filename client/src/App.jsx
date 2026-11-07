import { Route, Routes } from "react-router-dom";
import JobDetails from "./pages/JobDetails.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/home/Home.jsx";
import FindJobs from "./pages/FindJobs.jsx";
import { Toaster } from "react-hot-toast";
import AuthPage from "./pages/authPage.jsx";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/findjobs" element={<FindJobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/login" element={<AuthPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
