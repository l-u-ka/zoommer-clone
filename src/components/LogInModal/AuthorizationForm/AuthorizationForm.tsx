import { Form, Input, Button, Select } from "antd"
import { AuthorizationFormInput } from "@src/@types/types"
import { useState } from "react"
import { FormattedMessage, useIntl } from "react-intl"

interface LoginFormValues extends AuthorizationFormInput{
  prefix: string;
}

export default function AuthorizationForm() {
  const [authInput, setAuthInput] = useState<AuthorizationFormInput>({
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

  console.log(authInput)

  function onValuesChange(changedValues:LoginFormValues) {
    const {prefix, ...filtered} = changedValues;
    setAuthInput((prev) => ({
      ...prev,
      ...filtered,
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
      <Select style={{ width: 80}} >
        <Option value="995">+995</Option>
        <Option value="44">+44</Option>
      </Select>
    </Form.Item>
  );
  
  return (
    
    <Form
      // {...formItemLayout}
      form={form}
      name="authorize"
      onFinish={onFinish}
      onValuesChange={onValuesChange}
      initialValues={{prefix: '995' }}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
      <Form.Item
        name="phoneNumber"
        rules={[{ required: true, message: <FormattedMessage id="input.phone.number"/> }]}
        className="custom-input"
      >
        <Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder={formatMessage({id: "phone.number"})} className="custom-select" type="tel"/>
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
        <Button type="primary" htmlType="submit" className="custom-button">
          <FormattedMessage id="log.in"/>
        </Button>
      </Form.Item>
    </Form>
  )
}
