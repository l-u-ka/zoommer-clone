import { Form, Input, Button } from "antd"
import { AuthorizationFormInput } from "@src/@types/types"
import { useEffect, useState } from "react"
import { FormattedMessage, useIntl } from "react-intl"
import axios from "axios";


export default function AuthorizationForm() {
  const [authInput, setAuthInput] = useState<AuthorizationFormInput>({
    email: '',
    password: ''
  });
  const [form] = Form.useForm();
  const {formatMessage} = useIntl();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  function onFinish(changedValues:AuthorizationFormInput) {
    // console.log(authInput)
    setAuthInput(() => ({
      ...changedValues
    }));
    // form.resetFields();
  }

  async function userLogin() {
    try {
      setLoading(true);
      setIsError(false)
      const response = await axios.post("http://localhost:3000/auth/login", {
        email: authInput.email,
        password: authInput.password
      })

      if (response.status >= 200 && response.status < 300) {
        // Request was successful, handle the response data here
        console.log("Login successful:", response.data);
        form.resetFields();
      } else {
        // Request was not successful, handle the error
        console.error("Login failed. Status:", response.status);
      }
    } catch(e) {
      console.error(e)
      setIsError(true)
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=> {
    const isNotEmpty = Object.values(authInput).every(element => element !== '');
    if (isNotEmpty) {
      userLogin();
    }
  }, [authInput])

  // function onValuesChange(changedValues:LoginFormValues) {
  //   const {prefix, ...filtered} = changedValues;
  //   setAuthInput((prev) => ({
  //     ...prev,
  //     ...filtered,
  //   }));
  // }
  
  // const formItemLayout = {
  //   labelCol: {
  //     xs: { span: 24 },
  //     sm: { span: 8 },
  //   },
  //   wrapperCol: {
  //     xs: { span: 24 },
  //     sm: { span: 16 },
  //   },
  // };
  // const tailFormItemLayout = {
  //   wrapperCol: {
  //     xs: {
  //       span: 24,
  //       offset: 0,
  //     },
  //     sm: {
  //       span: 16,
  //       offset: 8,
  //     },
  //   },
  // };
  
  return (
    
    <Form
      // {...formItemLayout}
      form={form}
      name="authorize"
      onFinish={onFinish}
      // onValuesChange={onValuesChange}
      initialValues={{prefix: '995' }}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        rules={[
          {
            type: 'email',
            message: <FormattedMessage id="input.email.valid"/>,
          },
          {
            required: true,
            message: <FormattedMessage id="input.email"/>,
          },
        ]}
        className="custom-input"
      >
        <Input placeholder={formatMessage({id: "email"})}/>
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: <FormattedMessage id="input.password"/>,
          },
        ]}
        hasFeedback
        className="custom-input"
      >
        <Input.Password placeholder={formatMessage({id: "password"})}/>
      </Form.Item>

      <Form.Item > {/*{...tailFormItemLayout}*/}
        {/* <Button type="primary" htmlType="submit" style={{backgroundColor: '#ec5e2a'}} className="custom-button"> */}
        {isLoading && <div className="firago-bold text-black-04 text-sm leading-[17px] mb-2"><FormattedMessage id="loading"/>...</div>}
        {isError && <div className="firago-bold text-red-08 text-sm leading-[17px] mb-2"><FormattedMessage id="invalid.input"/></div>}
        <Button type="primary" htmlType="submit" className="custom-button">
          <FormattedMessage id="log.in"/>
        </Button>
      </Form.Item>
    </Form>
  )
}
