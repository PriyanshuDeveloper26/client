import { Routes, Route } from "react-router-dom";
// import Header from "./pages/header/Header";
import Login from "./pages/auth/login/Login";
import Signup from "./pages/auth/signup/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
// import Footer from "./pages/components/footer/Footer";
import ForgotPassword from "./pages/components/forgot-password/Forgot_password";
import ResetPassword from "./pages/components/forgot-password/reset-password/Reset_password";
import AdminDashboard from "./pages/admin-dashboard/AdminDashboard";
import UploadExcel from "./pages/components/uploads/upload";
import RecentFileData from "./pages/utils/files_history/recentFileData";
import TotalFileHistory from "./pages/utils/total_file_uploaded/totalFileHistory";
import ChartDashboard from "./pages/components/charts/ExcelChart";
import Sidebar from "./pages/components/sidebar/sidebar";
import { useLocation } from "react-router-dom";
function App() {
    const location = useLocation();
  return (
    <>
      {/* <Header></Header> */}
      { location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/forgot-password" || location.pathname === "/reset-password" || location.pathname === "/admin-dashboard" ? null : <Sidebar></Sidebar>}
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Signup></Signup>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route
          path="/forgot-password"
          element={<ForgotPassword></ForgotPassword>}
        ></Route>
        <Route
          path="/reset-password"
          element={<ResetPassword></ResetPassword>}
        ></Route>
        <Route
          path="/admin-dashboard"
          element={<AdminDashboard></AdminDashboard>}
        ></Route>
        <Route path="/uploads" element={<UploadExcel></UploadExcel>}></Route>
        <Route
          path="/uploads/recent-files"
          element={<RecentFileData></RecentFileData>}
        ></Route>
        <Route
          path="/uploads/total-files"
          element={<TotalFileHistory></TotalFileHistory>}
        ></Route>
        <Route
          path="/charts"
          element={<ChartDashboard></ChartDashboard>}
        ></Route>
      </Routes>
      {/* <Footer></Footer> */}
    </>
  );
}

export default App;
