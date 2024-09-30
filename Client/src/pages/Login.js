import React, { useState, useEffect } from "react";
import { Form, Input, message, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Form submit handler
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("https://production-expense-app.onrender.com/api/v1/users/login", values);
      setLoading(false);
      message.success("Login successful");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error); // Logging error for debugging
      message.error("Something went wrong. Please try again.");
    }
  };

  // Prevent logged-in users from accessing the login page
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="p-4">
        <h1 className="text-center text-warning text-decoration-underline">
          EXPENSE MANAGEMENT SYSTEM
        </h1>
      </div>
      <div className="register-page">
        {loading && <Spinner />}
        <Form layout="vertical" onFinish={submitHandler}>
          <h1 className="text-center">Login Form</h1>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email address." },
              { type: "email", message: "Please enter a valid email address." }
            ]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password." }]}
          >
            <Input type="password" />
          </Form.Item>

          <div className="d-flex justify-content-between">
            <Link to="/register">Not a user? Click here to register</Link>
            <Button type="primary" htmlType="submit" loading={loading}>
              Login
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
