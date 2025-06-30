import React from 'react';

import styles from "./Login.module.css";

import {useNavigate} from 'react-router-dom';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input,message } from 'antd';

import {authAPI} from "../../api/auth.api"
import {setToken} from "../../utils/auth";


type FieldType = {
	username: string;
	password: string;
};

const Login: React.FC = () => {

const navigate = useNavigate();

const [messageApi, contextHolder] = message.useMessage();

const success = () => {
		messageApi.open({
			type: 'success',
			content: 'Login successful!',
		});
	};

	const errorr = () => {
		messageApi.open({
			type: 'error',
			content: 'Invalid credentials or network error',
		});
	};

const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
	try {

		const data = await authAPI.login(values.username!, values.password!);

		success();

		setToken(data.token)

		navigate('/products');

	} catch (error) {
		console.error('Login failed:', error);
		errorr();
	}
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
	errorr();
};


 return (
  <div className={styles.loginContainer}>
	  {contextHolder}
	  <Form
	   name="basic"
	   labelCol={{span: 8}}
	   wrapperCol={{span: 16}}
	   style={{maxWidth: 600}}
	   initialValues={{remember: true}}
	   onFinish={onFinish}
	   onFinishFailed={onFinishFailed}
	   autoComplete="off"
	  >
		  <Form.Item<FieldType>
		   label="Username"
		   name="username"
		   rules={[{required: true, message: 'Please input your username!'}]}
		  >
			  <Input/>
		  </Form.Item>

		  <Form.Item<FieldType>
		   label="Password"
		   name="password"
		   rules={[{required: true, message: 'Please input your password!'}]}
		  >
			  <Input.Password/>
		  </Form.Item>
		  <Form.Item label={null}>
			  <Button type="primary" htmlType="submit">
				  Submit
			  </Button>
		  </Form.Item>
	  </Form>
  </div>
 )
};

export default Login;