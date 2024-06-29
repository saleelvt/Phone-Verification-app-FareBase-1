import { Fragment } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLogin from "./components/user/userLogin";
import UserVerify from "./components/user/userVerify";
import UserSignup from "./components/user/userSignup";
import UserHome from "./components/user/userHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Fragment>
          <Route path="/" element={<UserLogin />} />
          <Route path="/Verify" element={<UserVerify />} />
          <Route path="/Signup" element={<UserSignup />} />
          <Route path="/Home" element={<UserHome />} />
        </Fragment>
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
