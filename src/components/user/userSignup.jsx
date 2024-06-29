import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/loginPage.css";
import "../css/signup.css";
import { Fragment } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import formikConfig from "../../utils/validations/formi.js";
import { useNavigate } from "react-router-dom";


const UserSignup = () => {
  let navigate = useNavigate();
  const handleSignup = async (values, { setSubmitting }) => {
    try {
      let check = "@gmail.com";
      const { email, firstName, lastName } = values;
      if (email && firstName && lastName) {
        if (email.includes(check)) {
          navigate("/Home");
        } else {
          navigate("/Signup");
        }
      }
      setSubmitting(false);
    } catch (error) {
      console.log("errro when signup", error);
    }
  };
  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 d-lg-block d-none">
            <div className="signup-img">
              <img
                src="https://i.postimg.cc/GtYNybX8/Screenshot-2024-06-23-112217.png"
                alt=""
                className="img-fluid fixed-image"
              />
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex align-items-center justify-content-center signup-parent">
            <div className="signup-form col-12 col-md-8 col-lg-6">
              <h2 className="">Signup</h2>
              <p id="normal-page" className="">
                Let’s get you all set up so you can access your personal
                account.
              </p>

              <Formik
                initialValues={{ firstName: "", lastName: "", email: "" }}
                validationSchema={formikConfig.validateSignup}
                onSubmit={handleSignup}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form>
                    <div className="form-group d-flex">
                      <div className="flex-fill">
                        <Field
                          id="names-input"
                          type="text"
                          placeholder="First Name"
                          className={`form-control ${
                            errors.firstName && touched.firstName
                              ? "is-invalid"
                              : ""
                          }`}
                          name="firstName"
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="text-danger text-smaller"
                        />
                      </div>
                      <div className="flex-fill ml-2">
                        <Field
                          id="names-input"
                          type="text"
                          placeholder="Last Name"
                          className={`form-control ${
                            errors.lastName && touched.lastName
                              ? "is-invalid"
                              : ""
                          }`}
                          name="lastName"
                        />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="text-danger text-smaller"
                        />
                      </div>
                    </div>

                    <Field
                      id="signup-input"
                      type="text"
                      placeholder="Enter Email"
                      className={`form-control mt-3 ${
                        errors.email && touched.email ? "is-invalid" : ""
                      }`}
                      name="email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger text-smaller"
                    />

                    <div className="form-group d-flex align-items-center p-2">
                      <input type="checkbox" />
                      <label id="terms-ptag" className="ml-1">
                        I agree to all the{" "}
                        <span style={{ color: "red" }}>Terms</span> and{" "}
                        <span style={{ color: "red" }}>Privacy Policies</span>
                      </label>
                    </div>

                    <Button
                      type="submit"
                      className="signup-button"
                      disabled={isSubmitting}
                      style={{ color: "white" }}
                    >
                      Create Account
                    </Button>
                    <p id="terms-ptag" className="mt-2 ml-36">
                      Already have an account?{" "}
                      <span style={{ color: "red" }}>Login</span>
                    </p>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserSignup;
