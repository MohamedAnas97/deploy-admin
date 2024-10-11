import { Button, Form, Checkbox, Input, notification, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import cookie from "react-cookies";
const Login = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const onChange = (newName) => {
    cookie.save("token", newName, { path: "/" });
  };

  // notification handler
  const openNotification = (message, description) => {
    notification.open({
      message: message,
      description: description,
    });
  };
  // onFinish
  const onFinish = (values) => {
    setLoader(true);
    console.log(values);
    const payload = {
      email: values.email,
      password: values.password,
    };
    axios
      .post(`${process.env.REACT_APP_FRONTED_URL}/auth/admin/login`, payload)
      .then((response) => {
        console.log("response", response);
        onChange(
          response?.data?.token && JSON.stringify(response?.data?.token)
        );
        setLoader(false);
        openNotification("Success", "Your are loggedIn Successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log("error", error);
        setLoader(false);
        openNotification("Error", "Incorrect email and password");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="login-page">
      <div className="login-box">
        <div
          className="illustration-wrapper"
          style={{
            background: "#001d3d",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "30px",
          }}
        >
          <img src={require("../../assets/dashboard/logo1.png")} alt="" />
        </div>
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <p className="welcome_head">Welcome to Duomo</p>

          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input placeholder="Email" style={{ fontSize: "16px" }} />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Password"
              style={{ fontSize: "16px" }}
            />
          </Form.Item>
          <div>
            <p
              style={{ fontSize: "14px", color: "#ff4d4f", marginTop: "0px" }}
            ></p>
          </div>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              {loader ? <Spin /> : "LOGIN"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
