import React, { useState } from 'react'
import { Form, Input, Button, Card, Layout, Typography } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import style from "./style";
import { login, signup } from "../../actions/authentication";

const { Title } = Typography;

const AuthForm = () => {
  const user = null;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (formValues) => {
    if(isLogin){
      dispatch(login(formValues, navigate));
    } else {
      dispatch(signup(formValues, navigate));
    }
  }

  const switchMode = () => {
    setIsLogin(preIsLogin => !preIsLogin);
  }

  const [isLogin, setIsLogin] = useState(true);

  return (
    <Layout style={style.container}>
      <Card 
        style={style.card}
        title={
          <Title level={4} style={{textAlign: 'center'}}>
            Sign In
          </Title>
        }
      >
        <Form
          name='authform'
          form={form}
          size='large'
          wrapperCol={{ span: 20, offset: 2}}
          onFinish={onSubmit}
        >
          {isLogin || (
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please enter your username"
                }
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder='username'></Input>
            </Form.Item>
          )}
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter valid email address"
              }
            ]}
          >
            <Input type='email' prefix={<MailOutlined />} placeholder='email'></Input>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password"
              }
            ]}
          >
            <Input.Password type='password' prefix={<LockOutlined />} placeholder='password'></Input.Password>
          </Form.Item>
          {isLogin || (
            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please enter your password"
                }
              ]}
            >
              <Input.Password type='password' prefix={<LockOutlined />} placeholder='confirm password'></Input.Password>
            </Form.Item>
          )}
          <Form.Item>
            <Button htmlType='submit' typeof='primary' >
              {isLogin ? "Log In" : "Join"}
            </Button>
            <span style={{ margin: "0 10px 0px 15px" }}>Or</span>
            <Button type='link' onClick={switchMode}>
              {isLogin ? "Register now" : "Have an account?"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  )
}

export default AuthForm;