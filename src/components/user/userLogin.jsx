
import React, { Fragment, useEffect } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { confirFunction } from "../../store/loginSlices.jsx";
import { auth } from "../../firebase/config.js";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  setPersistence,
  onAuthStateChanged,
  browserLocalPersistence,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import formikConfig from "../../utils/validations/formi.js";
import { Formik, Form, Field, ErrorMessage } from "formik";


const UserLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/Home");
      }
    });
  }, [navigate]);
  

  const handleNumberSubmit = async (values, { setSubmitting }) => {
    try {
      const defaultCountryCode = "+91";
      const phoneNumberWithCountryCode = `${defaultCountryCode}${values.number}`;
      const recaptchaContainer = document.getElementById("recaptcha-container");
      const recaptchaVerifier = new RecaptchaVerifier(
        auth,
        recaptchaContainer,
        {}
      );

      if (recaptchaVerifier) {
        setPersistence(auth, browserLocalPersistence)
          .then(async () => {
            const confirmation = await signInWithPhoneNumber(
              auth,
              phoneNumberWithCountryCode,
              recaptchaVerifier
            );

            dispatch(confirFunction(confirmation));
            navigate("/Verify");
          })
          .catch((error) => {
            if (error.code) console.log("my code encunded in ", error.code);
            if (error.message) console.log("my code missing", error.message);
          });
      }
    } catch (error) {
      console.log("error is ", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-6 d-flex align-items-center justify-content-center parent">
            <div className="form col-12 col-md-6 col-sm-2">
              <h2 className="">Login</h2>
              <p id="normal-page" className="">
                Login to access your travelwise account
              </p>
              <Formik
                initialValues={{
                  number: "",
                }}
                validationSchema={formikConfig.validatePhoneNumber}
                onSubmit={handleNumberSubmit}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form>
                    <Field
                      type="tel"
                      id="input"
                      placeholder="Enter mobile number"
                      className={`form-control mb-3 ${
                        errors.number && touched.number ? "is-invalid" : ""
                      }`}
                      name="number"
                    />

                    <ErrorMessage
                      name="number"
                      component="div"
                      className="text-danger fa-bold ml-24 text-smaller"
                    />

                    <div id="recaptcha-container"></div>

                    <Button type="submit" id="button">
                      Get OTP
                    </Button>
                    <p id="terms-ptag" className="text-sm ml-24 mt-1">
                      Don’t have an account?{" "}
                      <span style={{ color: "red" }}>Sign up</span>
                    </p>
                  </Form>
                )}

              </Formik>
            </div>
          </div>
          <div className="col-12 col-md-6 d-none d-md-block ">
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
};

export default UserLogin;
