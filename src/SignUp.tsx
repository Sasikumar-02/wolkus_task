// import "./styles/Custom.css"

import * as yup from "yup";

import {
  Button,
  Col,
  ConfigProvider,
  Form as AntdForm,
  Input,
  Row,
  Typography,
  notification,
} from "antd";
import { ErrorMessage, Formik, FormikHelpers } from "formik";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import type { ThemeConfig } from "antd";

const config: ThemeConfig = {
  token: {
    colorPrimary: "#0B4266",
    colorPrimaryBg: "#E7ECF0",
  },
};

interface SignUpT {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  dob: string;
}

type FieldType = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  dob?: string;
};

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSignUp = async (
    values: SignUpT,
    { setSubmitting }: FormikHelpers<SignUpT>
  ) => {
    try {
      setSubmitting(true);
      // Here you can handle the API request if needed.
      // For now, we'll just store the data in local storage.
      localStorage.setItem("signup", JSON.stringify(values));
      setSubmitting(false);
      notification.success({
        message: "Sign Up Successful",
        description: "You have signed up successfully!",
      });
      navigate("/"); // Navigate to home or login page after successful signup
    } catch (error) {
      console.error("Error:", error);
      setSubmitting(false);
      notification.error({
        message: "Sign Up Failed",
        description: "There was an issue with your sign up. Please try again.",
      });
    }
  };

  return (
    <div>
      <ConfigProvider theme={config}>
        <div
          style={{
            width: "1000px",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            backgroundColor: "#ffffff",
            padding: "50px",
            borderRadius: "10px",
            boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
          }}
          className="signup-container"
        >
          <Row justify="center" align="middle" className="signup-row">
            <Col span={12} className="right-side">
              <div className="right-content">
                <h1>Sign Up</h1>
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    dob: "",
                  }}
                  onSubmit={handleSignUp}
                  validationSchema={yup.object().shape({
                    name: yup.string().required("Name is required"),
                    email: yup
                      .string()
                      .email("Invalid email format")
                      .required("Email is required"),
                    password: yup
                      .string()
                      .min(6, "Password should be at least 6 characters long")
                      .required("Password is required"),
                    confirmPassword: yup
                      .string()
                      .oneOf([yup.ref("password"), ""], "Passwords must match")
                      .required("Confirm Password is required"),
                    dob: yup.date().required("Date of Birth is required"),
                  })}
                >
                  {({
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <AntdForm
                      name="basic"
                      style={{ maxWidth: 600 }}
                      layout="vertical"
                      autoComplete="off"
                      onFinish={handleSubmit}
                    >
                      <AntdForm.Item<FieldType>
                        label="Name"
                        className="label-strong"
                        name="name"
                        required
                        style={{ padding: "10px" }}
                      >
                        <Input
                          style={{
                            height: "50px",
                            width: "470px",
                            borderRadius: "4px",
                            margin: "0px",
                          }}
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <Typography.Text
                          type="danger"
                          style={{ wordBreak: "break-word", textAlign: "left" }}
                        >
                          <ErrorMessage name="name" />
                        </Typography.Text>
                      </AntdForm.Item>

                      <AntdForm.Item<FieldType>
                        label="Email"
                        className="label-strong"
                        name="email"
                        required
                        style={{ padding: "10px" }}
                      >
                        <Input
                          style={{
                            height: "50px",
                            width: "470px",
                            borderRadius: "4px",
                            margin: "0px",
                          }}
                          prefix={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="28"
                              height="28"
                              viewBox="0 0 18 14"
                              fill="none"
                            >
                              <path
                                d="M15.6666 0.381836H2.33329C1.41663 0.381836 0.674959 1.13184 0.674959 2.0485L0.666626 12.0485C0.666626 12.9652 1.41663 13.7152 2.33329 13.7152H15.6666C16.5833 13.7152 17.3333 12.9652 17.3333 12.0485V2.0485C17.3333 1.13184 16.5833 0.381836 15.6666 0.381836ZM15.6666 3.71517L8.99996 7.88184L2.33329 3.71517V2.0485L8.99996 6.21517L15.6666 2.0485V3.71517Z"
                                fill="#041724"
                              />
                            </svg>
                          }
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <Typography.Text
                          type="danger"
                          style={{ wordBreak: "break-word", textAlign: "left" }}
                        >
                          <ErrorMessage name="email" />
                        </Typography.Text>
                      </AntdForm.Item>

                      <AntdForm.Item<FieldType>
                        label="Password"
                        className="label-strong"
                        name="password"
                        required
                        style={{ padding: "10px" }}
                      >
                        <Input.Password
                          style={{
                            height: "50px",
                            width: "470px",
                            borderRadius: "4px",
                            margin: "0px",
                          }}
                          prefix={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="28"
                              height="28"
                              viewBox="0 0 20 21"
                              fill="none"
                            >
                              <g clipPath="url(#clip0_293_1306)">
                                <path
                                  d="M15 7.21517H14.1667V5.5485C14.1667 3.2485 12.3 1.38184 10 1.38184C7.70004 1.38184 5.83337 3.2485 5.83337 5.5485V7.21517H5.00004C4.08337 7.21517 3.33337 7.96517 3.33337 8.88184V17.2152C3.33337 18.1318 4.08337 18.8818 5.00004 18.8818H15C15.9167 18.8818 16.6667 18.1318 16.6667 17.2152V8.88184C16.6667 7.96517 15.9167 7.21517 15 7.21517ZM10 14.7152C9.08337 14.7152 8.33337 13.9652 8.33337 13.0485C8.33337 12.1318 9.08337 11.3818 10 11.3818C10.9167 11.3818 11.6667 12.1318 11.6667 13.0485C11.6667 13.9652 10.9167 14.7152 10 14.7152ZM12.5834 7.21517H7.41671V5.5485C7.41671 4.1235 8.57504 2.96517 10 2.96517C11.425 2.96517 12.5834 4.1235 12.5834 5.5485V7.21517Z"
                                  fill="#041724"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_293_1306">
                                  <rect
                                    width="20"
                                    height="20"
                                    fill="white"
                                    transform="translate(0 0.54834)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          }
                          type="password"
                          value={values.password}
                          onChange={handleChange}
                          name="password"
                          onBlur={handleBlur}
                          size="large"
                          iconRender={(visible: any) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                          }
                        />
                        <Typography.Text
                          type="danger"
                          style={{ wordBreak: "break-word", textAlign: "left" }}
                        >
                          <ErrorMessage name="password" />
                        </Typography.Text>
                      </AntdForm.Item>

                      <AntdForm.Item<FieldType>
                        label="Confirm Password"
                        className="label-strong"
                        name="confirmPassword"
                        required
                        style={{ padding: "10px" }}
                      >
                        <Input.Password
                          style={{
                            height: "50px",
                            width: "470px",
                            borderRadius: "4px",
                            margin: "0px",
                          }}
                          prefix={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="28"
                              height="28"
                              viewBox="0 0 20 21"
                              fill="none"
                            >
                              <g clipPath="url(#clip0_293_1306)">
                                <path
                                  d="M15 7.21517H14.1667V5.5485C14.1667 3.2485 12.3 1.38184 10 1.38184C7.70004 1.38184 5.83337 3.2485 5.83337 5.5485V7.21517H5.00004C4.08337 7.21517 3.33337 7.96517 3.33337 8.88184V17.2152C3.33337 18.1318 4.08337 18.8818 5.00004 18.8818H15C15.9167 18.8818 16.6667 18.1318 16.6667 17.2152V8.88184C16.6667 7.96517 15.9167 7.21517 15 7.21517ZM10 14.7152C9.08337 14.7152 8.33337 13.9652 8.33337 13.0485C8.33337 12.1318 9.08337 11.3818 10 11.3818C10.9167 11.3818 11.6667 12.1318 11.6667 13.0485C11.6667 13.9652 10.9167 14.7152 10 14.7152ZM12.5834 7.21517H7.41671V5.5485C7.41671 4.1235 8.57504 2.96517 10 2.96517C11.425 2.96517 12.5834 4.1235 12.5834 5.5485V7.21517Z"
                                  fill="#041724"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_293_1306">
                                  <rect
                                    width="20"
                                    height="20"
                                    fill="white"
                                    transform="translate(0 0.54834)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          }
                          type="password"
                          value={values.confirmPassword}
                          onChange={handleChange}
                          name="confirmPassword"
                          onBlur={handleBlur}
                          size="large"
                          iconRender={(visible: any) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                          }
                        />
                        <Typography.Text
                          type="danger"
                          style={{ wordBreak: "break-word", textAlign: "left" }}
                        >
                          <ErrorMessage name="confirmPassword" />
                        </Typography.Text>
                      </AntdForm.Item>

                      <AntdForm.Item<FieldType>
                        label="Date of Birth"
                        className="label-strong"
                        name="dob"
                        required
                        style={{ padding: "10px" }}
                      >
                        <Input
                          type="date"
                          style={{
                            height: "50px",
                            width: "470px",
                            borderRadius: "4px",
                            margin: "0px",
                          }}
                          name="dob"
                          value={values.dob}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <Typography.Text
                          type="danger"
                          style={{ wordBreak: "break-word", textAlign: "left" }}
                        >
                          <ErrorMessage name="dob" />
                        </Typography.Text>
                      </AntdForm.Item>

                      <AntdForm.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          style={{ width: "100%", height: "41px" }}
                          className="Button"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Signing up..." : "Sign Up"}
                        </Button>
                      </AntdForm.Item>
                    </AntdForm>
                  )}
                </Formik>
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                <p>If you already have an account, please sign up:</p>
                <Button
                    onClick={() => navigate('/login')}
                    style={{ color: 'white', background: '#0B4266', width: '100px' }}
                >
                    Login
                </Button>
              </div>
              </div>
            </Col>
          </Row>
        </div>
      </ConfigProvider>
    </div>
  );
};

export default SignUpPage;
