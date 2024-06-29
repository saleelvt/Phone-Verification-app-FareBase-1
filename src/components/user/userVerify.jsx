import React, { useEffect, Fragment, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import '../../css/loginPage.css'
import '../../css/signup.css'
import { db } from "../../firebase/config.js";

import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import formikConfig from "../../utils/validations/formi.js";
import { Formik, Form, Field, ErrorMessage } from "formik";

function UserVerify() {
  let navigate = useNavigate();
  let confirmation = useSelector((state) => state.LoginDetails.userFunction);

  console.log("my confirmation function is ", confirmation);
  const [error, setError] = useState(""); // State to manage error messages
  const [isVerifying, setIsVerifying] = useState(false); // State to manage verification loading
  const [otp, takeOpt] = useState(null);


  useEffect(() => {
    if (otp) {
      const confirmOtp = async () => {
        setIsVerifying(true);
        try {
          const confrimData = await confirmation.confirm(otp);
          const userPhoneNumber = confrimData.user.phoneNumber;
          const userExists = await checkIfUserExists(userPhoneNumber);
          if (!userExists) {
            await addUserToFirestore(userPhoneNumber);
            navigate("/Signup");
          } else {
            navigate("/Home");
          }
        } catch (error) {
          setError("Invalid OTP. Please enter a valid OTP.");
          console.log("error when confirm ", error);
        } finally {
          setIsVerifying(false);
        }
      };
      confirmOtp();
    }
  }, [otp, confirmation, navigate]);

  const checkIfUserExists = async (phoneNumber) => {
    const q = query(
      collection(db, "Users"),
      where("phoneNumber", "==", phoneNumber)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const addUserToFirestore = async (phoneNumber) => {
    try {
      await addDoc(collection(db, "Users"), {
        phoneNumber: phoneNumber,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  let handleOtp = (values) => {
    takeOpt(values.otp);
  };

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-6 d-flex align-items-center justify-content-center parent">
            <div className="form col-12 col-md-6 col-sm-2">
              <button className="custom-button" id="buttonP">
                &lt; Back to login
              </button>
              <h2 className=""> Verify code</h2>
              <p id="normal-page" className="">
                An authentication code has been sent to your email.
              </p>
              <Formik
                initialValues={{ otp: "" }}
                validationSchema={formikConfig.validateOtp}
                onSubmit={handleOtp}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form>
                    <Field
                      type="text"
                      id="input"
                      placeholder="Enter OTP"
                      className={`form-control mb-3 ${
                        errors.otp && touched.otp ? "is-invalid" : ""
                      }`}
                      name="otp"
                    />
                    <ErrorMessage
                      name="otp"
                      component="div"
                      className="text-danger fa-bold ml-24 text-smaller"
                    />
                    {error && (
                      <div className="text-danger fa-bold ml-24 text-smaller">
                        {error}
                      </div>
                    )}
                    <p id="terms-ptag" className=" mb-4">
                      Didn’t receive a code? Resend{" "}
                      <span style={{ color: "red" }}>Resend</span>
                    </p>
                    <Button type="submit" id="button" disabled={isVerifying}>
                      {isVerifying ? (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                      ) : null}
                      {isVerifying ? "Verifying..." : "Verify"}
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>

          <div className="col-12 col-md-6 d-none d-md-block parent">
            <div className="d-flex justify-content-center align-items-center min-vh-100">
              <img
                src="https://i.postimg.cc/FsS034rX/Screenshot-2024-06-22-205819.png"
                alt=""
                className="img-fluid fixed-image"
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default UserVerify;
