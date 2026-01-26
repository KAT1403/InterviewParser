import AppRouterProvider from "../providers/AppRouterProvider";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import InterviewPage from "@/pages/InterviewPage/ui/InterviewPage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import ProfilePage from "@/pages/ProfilePage";
import ResultPage from "@/pages/ResultPage";
import ManagementPage from "@/pages/ManagementPage";

function App() {
  return (
    <AppRouterProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/management" element={<ManagementPage />} />
        <Route path="/result/:id" element={<ResultPage />} />
      </Routes>
    </AppRouterProvider>
  );
}

export default App;
