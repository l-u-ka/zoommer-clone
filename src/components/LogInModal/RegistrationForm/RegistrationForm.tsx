import { Form, Input, Button, Select } from "antd"
import { RegistrationFormInput } from "@src/@types/types"
import { useEffect, useState } from "react"
import { FormattedMessage, useIntl } from "react-intl"
import axios from "axios";
import { useAuthProvider } from "@src/providers/AuthProvider/useAuthProvider";
import PrimaryButton from "@src/components/PrimaryButton/PrimaryButton";

interface FormValues extends RegistrationFormInput {
  confirm_password:string;
  prefix:string;
}


export default function RegistrationForm({closeModal}: {closeModal: ()=> void}) {

  const [isError, setIsError] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const {Option} = Select;
  const [registrationForm] = Form.useForm();
  const {formatMessage} = useIntl();
  const {setAuthData} = useAuthProvider();

  function onFinish(changedValues: FormValues) {
    registerUser(changedValues.first_name, changedValues.last_name, changedValues.email, changedValues.password, changedValues.phone_number)
  }
  
  async function registerUser(first_name: string, last_name:string, email: string, password:string, phone_number: string) {
    try {
      setIsError('')
      setLoading(true);
      const response = await axios.post("http://localhost:3000/auth/register", {
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "password": password,
        "phone_number": phone_number
    })
      setAuthData(response.data)
      closeModal();
    } catch (e) {
      setIsError('register.error')
      console.error("Did not register successfully", e)
    } finally {
      setLoading(false);
    }
  }

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 80}} >
        <Option value="995">+995</Option>
        <Option value="44">+44</Option>
      </Select>
    </Form.Item>
  );
  
  return (
    
    <Form<FormValues>
      form={registrationForm}
      name="register"
      onFinish={onFinish}
      initialValues={{prefix: '995' }}
      style={{ maxWidth: 600 }}
      scrollToFirstError
      onValuesChange={() => {
        setIsError('')
      }}
    >
      <Form.Item
        name="first_name"
        rules={[{ required: true, message: <FormattedMessage id="input.name"/>}]}
        className="custom-input"
      >
        <Input placeholder={formatMessage({id: "name"})}/>
      </Form.Item>

      <Form.Item
        name="last_name"
        rules={[{ required: true, message: <FormattedMessage id="input.surname"/> }]}
        className="custom-input"
      >
        <Input placeholder={formatMessage({id: "surname"})}/>
      </Form.Item>

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
        name="phone_number"
        rules={[
          { 
            required: true, 
            message: <FormattedMessage id="input.phone.number"/> 
          },
          {
            max: 9,
            message: <FormattedMessage id="input.phone.number.maxlength" values={{ maxLength: 9 }} />, 
          },
          {
            validator: (_, value) => {
              if (/^\d+$/.test(value)) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(formatMessage({ id: 'input.phone.number.invalid' })));
            },
          },
        ]}
        className="custom-input"
      >
        <Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder={formatMessage({id: "phone.number"})} className="custom-addon" type="tel"/>
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
          },
        ]}
        hasFeedback
        className="custom-input"
      >
        <Input.Password placeholder={formatMessage({id: "password"})}/>
      </Form.Item>

      <Form.Item
        name="confirm_password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: <FormattedMessage id="input.password.confirm"/>,
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(formatMessage({id: 'input.password.mismatch'})));
            },
          }),
        ]}
        className="custom-input"
      >
        <Input.Password placeholder={formatMessage({id: "confirm.password"})}/>
      </Form.Item>

      <Form.Item >
        {isError && <div className="firago-bold text-red-08 text-sm leading-[17px] mb-2"><FormattedMessage id={`${isError}`}/></div>}
        <PrimaryButton loading={isLoading} width="100%" height={50} onClick={() => registrationForm.submit()}><p className="firago-bold text-sm leading-[17px]"><FormattedMessage id="register"/></p></PrimaryButton>
      </Form.Item>
    </Form>
  )
}
