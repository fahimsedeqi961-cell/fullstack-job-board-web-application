import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n.js";
import App from "./App.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { ThemeProvider } from "./context/themeContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext.jsx";
import { SavedJobsProvider } from "./context/savedJobsContext.jsx";
import { JobsProvider } from "./context/findJobsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <JobsProvider>
        <SavedJobsProvider>
          <ThemeProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </ThemeProvider>
        </SavedJobsProvider>
      </JobsProvider>
    </BrowserRouter>
  </StrictMode>,
);
