import { Routes, Route } from "react-router-dom";
import Header from "./pages/header/Header";
import Login from "./pages/auth/login/Login";
import Signup from "./pages/auth/signup/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Footer from "./pages/components/footer/Footer";
import ForgotPassword from "./pages/components/forgot-password/Forgot_password";
import ResetPassword from "./pages/components/forgot-password/reset-password/Reset_password";
function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Signup></Signup>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route path="/forgot-password" element={<ForgotPassword></ForgotPassword>}></Route>
        <Route path="/reset-password" element={<ResetPassword></ResetPassword>}></Route>
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
