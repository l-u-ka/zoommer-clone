import { Form, Input, Button } from "antd"
import { AuthorizationFormInput } from "@src/@types/types"
import { useState } from "react"
import { FormattedMessage, useIntl } from "react-intl"
import { publicAxios } from "@src/utils/publicAxios";
import { useAuthProvider } from "@src/providers/AuthProvider/useAuthProvider";
import PrimaryButton from "@src/components/PrimaryButton/PrimaryButton";

export default function AuthorizationForm({closeModal}: {closeModal: ()=> void}) {
  const [loginForm] = Form.useForm();
  const {formatMessage} = useIntl();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const {setAuthData} = useAuthProvider();

  /*
const [authInput, setAuthInput] = useState<AuthorizationFormInput>({
    email: localStorage.getItem('emailInput') || '',
    password: localStorage.getItem('passwordInput') || ''
  });

  function handleValuesChange(changedValues:AuthorizationFormInput) {
    setAuthInput((prev) => ({
      ...prev,
      ...changedValues
    }));
  }
  
  const authInputRef = useRef(authInput);

  useEffect(() => {
    authInputRef.current = authInput;
  }, [authInput]);

  useEffect(() => {
    return () => {
      localStorage.setItem('emailInput', authInputRef.current.email)
      localStorage.setItem('passwordInput', authInputRef.current.password)
      console.log(authInputRef.current);
    }
  }, []);


  useEffect(() => {
    if (localStorage.getItem('emailInput')) {
      loginForm.setFieldValue('email', localStorage.getItem('emailInput'))
    }
    if (localStorage.getItem('passwordInput')) {
      loginForm.setFieldValue('password', localStorage.getItem('passwordInput'))
    }
  }, [])

  function onFinish(changedValues:AuthorizationFormInput) {
    userLogin(changedValues.email, changedValues.password);
    localStorage.removeItem('emailInput');
    localStorage.removeItem('passwordInput');
  }


  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      console.log('reload');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  */

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

      <Form.Item >
        {isError && <div className="firago-bold text-red-08 text-sm leading-[17px] mb-2"><FormattedMessage id="invalid.input"/></div>}
        <PrimaryButton loading={isLoading} width="100%" height={50} onClick={() => loginForm.submit()}><p className="firago-bold text-sm leading-[17px]"><FormattedMessage id="log.in"/></p></PrimaryButton>
      </Form.Item>
    </Form>
  )
}
