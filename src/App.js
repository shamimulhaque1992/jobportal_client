import logo from "./logo.svg";
import "./App.css";
import { Button } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import ViewJobs from "./Pages/VeiwJobs/ViewJobs";
import PostJobs from "./Pages/PostJobs/PostJobs";
import Navbar from "./Pages/Shared/Navbar/Navbar";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import RequireAuth from "./Pages/Login/RequireAuth";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import Operation from "./Pages/Operation/Operation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Pages/Shared/Footer/Footer";
import Faq from "./Pages/Faq/Faq";
import Contacts from "./Pages/Contacts/Contacts";

function App() {
  return (
    <div className="App relative">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/viewjobs" element={<RequireAuth><ViewJobs></ViewJobs></RequireAuth>}></Route>
        <Route path="/postjobs" element={<RequireAuth><PostJobs></PostJobs></RequireAuth>}></Route>
        <Route path="/operation" element={<RequireAuth><Operation></Operation></RequireAuth>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword></ForgotPassword>}></Route>
        <Route path="/faq" element={<Faq></Faq>}></Route>
        <Route path="/contacts" element={<Contacts></Contacts>}></Route>
      </Routes>
      <ToastContainer />
      <Footer></Footer>
    </div>
  );
}

export default App;
