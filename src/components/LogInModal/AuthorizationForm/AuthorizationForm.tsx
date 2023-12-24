import { Form, Input, Button, Select } from "antd"
import { AuthorizationFormInput } from "@src/@types/types"
import { useEffect, useState } from "react"
import { FormattedMessage, useIntl } from "react-intl"

interface FormValues extends AuthorizationFormInput {
  confirmPassword:string;
  prefix:string;
}


export default function AuthorizationForm() {

  const [authInput, setAuthInput] = useState<AuthorizationFormInput>({
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
    password: ''
  });
  const {Option} = Select;
  const [form] = Form.useForm();

  const {formatMessage} = useIntl();

  function onFinish(_args: any) {
    console.log(authInput)
    form.resetFields();
  }

  function onValuesChange(changedValues: FormValues) {
    setAuthInput((prev) => ({
      ...prev,
      ...changedValues,
    }));
  }
  
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
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 80}} className="custom-select">
        <Option value="995">+995</Option>
        <Option value="44">+44</Option>
      </Select>
    </Form.Item>
  );
  
  return (
    
    <Form
      // {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      onValuesChange={onValuesChange}
      initialValues={{prefix: '995' }}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        rules={[{ required: true, message: <FormattedMessage id="input.name"/>}]}
        className="custom-input"
      >
        <Input placeholder={formatMessage({id: "name"})}/>
      </Form.Item>

      <Form.Item
        name="surname"
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
        name="phone"
        rules={[{ required: true, message: <FormattedMessage id="input.phone.number"/> }]}
        className="custom-input"
      >
        <Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder={formatMessage({id: "phone.number"})}/>
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

      <Form.Item
        name="confirmPassword"
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

      <Form.Item > {/*{...tailFormItemLayout}*/}
        <Button type="primary" htmlType="submit" style={{backgroundColor: '#ec5e2a'}} className="firago-bold w-full h-[50px] text-sm leading-[17px]">
          <FormattedMessage id="register"/>
        </Button>
      </Form.Item>
    </Form>
  )
}
