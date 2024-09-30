import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  //from submit
  const submitHandler = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      await axios.post("https://production-expense-app.onrender.com/api/v1/users/register", values);
      message.success("Registeration Successfull");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error)
      setLoading(false);
      message.error("something went wrong");
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div className="p-4">
        <h1 className="text-center text-warning text-decoration-underline">EXPENSE MANAGEMENT SYSTEM</h1>
      </div>
      <div className="register-page ">
        {loading && <Spinner />}
        <Form layout="vertical" onFinish={submitHandler}>
          <h1 className="text-center">Register Form</h1>
          <Form.Item label="Name" name="name">
            <Input required/>
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required/>
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required/>
          </Form.Item>
          <div className="d-flex justify-content-between">
            <Link to="/login">Already Register ? Click Here to login</Link>
            <button className="btn btn-primary">Register</button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;
