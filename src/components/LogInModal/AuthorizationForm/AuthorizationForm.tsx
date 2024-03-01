import { Form, Input, Button } from "antd"
import { AuthorizationFormInput } from "@src/@types/types"
import { useState } from "react"
import { FormattedMessage, useIntl } from "react-intl"
import { publicAxios } from "@src/utils/publicAxios";
import { useAuthProvider } from "@src/providers/AuthProvider/useAuthProvider";

export default function AuthorizationForm({closeModal}: {closeModal: ()=> void}) {
  const [loginForm] = Form.useForm();
  const {formatMessage} = useIntl();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const {setAuthData} = useAuthProvider();

  function onFinish(changedValues:AuthorizationFormInput) {
    userLogin(changedValues.email, changedValues.password);
  }

  async function userLogin(email: string, password:string) {
    try {
      setLoading(true);
      setIsError(false)
      const response = await publicAxios.post("/auth/login", {
        email: email,
        password: password
      })
      setAuthData(response.data);
      closeModal();
    } catch(e) {
      console.error(e)
      setIsError(true)
    } finally {
      setLoading(false);
    }
  }
  
  return (
    
    <Form
      form={loginForm}
      name="authorize"
      onFinish={onFinish}
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
          {
            validator: (_, value) => {
              if (value && value.length >= 8) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(formatMessage({ id: 'input.password.short' }))); // Add a message for short password
            },
          }
        ]}
        hasFeedback
        className="custom-input"
      >
        <Input.Password placeholder={formatMessage({id: "password"})}/>
      </Form.Item>

      <Form.Item > {/*{...tailFormItemLayout}*/}
        {/* <Button type="primary" htmlType="submit" style={{backgroundColor: '#ec5e2a'}} className="custom-button"> */}
        {isError && <div className="firago-bold text-red-08 text-sm leading-[17px] mb-2"><FormattedMessage id="invalid.input"/></div>}
        <Button loading={isLoading} type="primary" htmlType="submit" className="custom-button w-full">
          <FormattedMessage id="log.in"/>
        </Button>
      </Form.Item>
    </Form>
  )
}
