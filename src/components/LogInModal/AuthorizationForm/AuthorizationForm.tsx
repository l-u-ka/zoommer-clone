import { Form, Input} from "antd"
import { AuthorizationFormInput } from "@src/@types/types"
import { FormattedMessage, useIntl } from "react-intl"
import PrimaryButton from "@src/components/PrimaryButton/PrimaryButton";
import { useUserLogin } from "@src/hooks/useUserLogin";

export default function AuthorizationForm() {
  const [loginForm] = Form.useForm();
  const {formatMessage} = useIntl();
  const {userLogin, isError, isLoading} = useUserLogin();

  function onFinish(changedValues:AuthorizationFormInput) {
    userLogin(changedValues.email, changedValues.password);
  }
  
  return (
    <Form<AuthorizationFormInput>
      form={loginForm}
      name="authorization_form"
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

      <Form.Item >
        {isError && <div className="firago-bold text-red-08 text-sm leading-[17px] mb-2"><FormattedMessage id="invalid.input"/></div>}
        <PrimaryButton loading={isLoading} width="100%" height={50} onClick={() => loginForm.submit()}><p className="firago-bold text-sm leading-[17px]"><FormattedMessage id="log.in"/></p></PrimaryButton>
      </Form.Item>
    </Form>
  )
}
