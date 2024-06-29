import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Button } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import '../../css/loginPage.css'
import '../../css/signup.css'

import { getAuth, onAuthStateChanged } from "firebase/auth";


function UserHome() {
  const [number, setNumber] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setNumber(user.phoneNumber);
      } else {
        setNumber(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  let handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error.message);
      });
  };

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div id="homeparent" className="col-12 col-md-6 col-lg-12 col-sm-4  ">
            <div id="homediv" className="">
              <h4 className="ml-36"> {number}</h4>
              <Button
                onClick={handleLogout}
                type="button"
                style={{ color: "white" }}
                className="signup-button btn btn-primary  col-12 col-md-4 col-lg-12 col-sm-3 "
              >
                LogOut
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default UserHome;
