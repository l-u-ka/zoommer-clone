import { useAuthProvider } from "@src/providers/AuthProvider/useAuthProvider"
import { Button, ConfigProvider, Form, Input, Modal } from "antd";
import profileIcon from '@src/assets/icons/profile-icon.png'
import { FormattedMessage } from "react-intl";
import {useIntl} from "react-intl";
import { useEffect, useState } from "react";
import editIcon from '@src/assets/icons/edit-icon.png'
import { useThemeProvider } from "@src/providers/ThemeProvider/useThemeProvider";
import LogoutModal from "@src/components/LogoutModal/LogoutModal";

enum Editing_Form_Enum {
    FIRST_NAME = "edit_first_name",
    LAST_NAME = "edit_last_name",
    EMAIL = "edit_email",
    PHONE_NUMBER = "edit_phone_number",
}

interface TEdit_Form_Values {
    edit_first_name: string;
    edit_last_name: string;
    edit_email: string;
    edit_phone_number: string;
} 

export default function ProfilePage() {
    const {userData, logout} = useAuthProvider();
    const [form] = Form.useForm();
    const {formatMessage} = useIntl();
    const [isEditing, setIsEditing] = useState<Editing_Form_Enum>();
    const [isLogoutModal, setIsLogoutModal] = useState<boolean>(false);


    function showLogoutModal() {
        setIsLogoutModal(true);
    }
    function closeLogoutModal() {
        setIsLogoutModal(false);
    }

    const customTheme = {
        // algorithm: !lightMode ? darkAlgorithm : defaultAlgorithm,
        "components": {
          "Input": {
            "activeBorderColor": "rgb(236, 94, 42)",
            "hoverBorderColor": "rgb(236, 94, 42)",
            "paddingInline": 14,
            "paddingBlock": 16,
            "borderRadius": 12,
            "colorBorder": "rgb(242, 242, 242)",
            "colorBgContainer": "rgb(242, 242, 242) !important",
            "lineHeight": 1.0625,
            "colorTextPlaceholder": "rgba(0, 0, 0, 0.6)"
          },
          "Button": {
            "colorPrimary": "rgb(236, 94, 42)",
            "colorPrimaryHover": "rgb(236, 94, 42)",
            "colorPrimaryActive": "rgb(236, 94, 42)",
            "borderRadius": 12,
            "controlHeight": 50,
            "controlHeightLG": 50,
            "controlHeightSM": 30,
            "lineHeight": 1.75,
            "defaultBorderColor": "rgb(250, 84, 28)",
          },
          "Modal": {
            "borderRadiusLG": 20,
            "borderRadiusSM": 10
          },
        }
      }

    useEffect(()=> {
        form.setFieldsValue({
            edit_first_name: userData?.first_name,
        edit_last_name: userData?.last_name,
        edit_email: userData?.email,
        edit_phone_number: userData?.phone_number,
        })
    }, [userData])

    function handleFinish(values:TEdit_Form_Values) {
        console.log(values)
    }

    return (
        <ConfigProvider theme={customTheme}>
            <div className="custom-container mt-[30px] mb-[60px]">
                <div className="flex items-center">
                    <img src={profileIcon} alt="profile icon" className="w-6 mr-3"/>
                    <h1 className="text-2xl firago-bold leading-[29px] text-black-main dark:text-gray-primary"> <FormattedMessage id="hello"/>, {userData?.first_name}</h1>
                </div>
                <hr className="mt-[20px] mb-[30px] border border-solid border-white-400"/>
                <div>
                    <div className="flex">
                        <div className=" self-end">
                            <h4 className="text-orange-primary cursor-pointer firago-normal leading-[17px] text-sm opacity-80" 
                            onClick={showLogoutModal}
                            ><FormattedMessage id="logout"/></h4>
                            {isLogoutModal && <LogoutModal modalOpen={isLogoutModal} closeModal={closeLogoutModal}/>}
                        </div>
                        <hr className="mx-[100px] border border-solid border-white-400"/>
                        <div className="flex flex-col w-[400px]">
                            <h3 className="mb-[30px] firago-semibold text-lg leading-[22px] text-black-main dark:text-gray-primary"><FormattedMessage id="edit.profile"/></h3>
                            <Form<TEdit_Form_Values>
                                // {...formItemLayout}
                                form={form}
                                name="edit_profile"
                                onFinish={handleFinish}
                                style={{ maxWidth: 400 }}
                                //scrollToFirstError
                            >
                                <Form.Item
                                    name="edit_first_name"
                                    //rules={[{ required: false, message: <FormattedMessage id="input.name"/>}]}
                                    className="custom-input"
                                >
                                        <Input placeholder={formatMessage({id: "name"})} className="w-full custom-addon" 
                                            disabled={!(isEditing === Editing_Form_Enum.FIRST_NAME)}
                                            onBlur={()=> {
                                                if(isEditing === Editing_Form_Enum.FIRST_NAME) setIsEditing(undefined)
                                            }}
                                            addonAfter={<img src={editIcon} alt="edit input icon" className="cursor-pointer" onClick={()=>setIsEditing(Editing_Form_Enum.FIRST_NAME)}
                                            />}
                                        />
                                </Form.Item>
                                <Form.Item
                                    name="edit_last_name"
                                    //rules={[{ required: false, message: <FormattedMessage id="input.name"/>}]}
                                    className="custom-input"
                                >           
                                        <Input placeholder={formatMessage({id: "surname"})} className="w-full custom-addon" 
                                            disabled={!(isEditing === Editing_Form_Enum.LAST_NAME)}
                                            onBlur={()=> {
                                                if(isEditing === Editing_Form_Enum.LAST_NAME) setIsEditing(undefined)
                                            }}
                                            addonAfter={<img src={editIcon} alt="edit input icon" className="cursor-pointer" onClick={()=>setIsEditing(Editing_Form_Enum.LAST_NAME)}
                                            />}
                                        />
                                </Form.Item>
                                <Form.Item
                                    name="edit_email"
                                    //rules={[{ required: false, message: <FormattedMessage id="input.name"/>}]}
                                    className="custom-input"
                                    rules={[
                                        {
                                          type: 'email',
                                          message: <FormattedMessage id="input.email.valid"/>,
                                        },
                                      ]}
                                    >
                                        <Input placeholder={formatMessage({id: "email"})} className="w-full custom-addon" 
                                            disabled={!(isEditing === Editing_Form_Enum.EMAIL)}
                                            onBlur={()=> {
                                                if(isEditing === Editing_Form_Enum.EMAIL) setIsEditing(undefined)
                                            }}
                                            addonAfter={<img src={editIcon} alt="edit input icon" className="cursor-pointer" onClick={()=>setIsEditing(Editing_Form_Enum.EMAIL)}
                                            />}
                                        />
                                       
                                </Form.Item>
                                <Form.Item
                                    name="edit_phone_number"
                                    //rules={[{ required: false, message: <FormattedMessage id="input.name"/>}]}
                                    className="custom-input"
                                    rules={[
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
                                >
                                        <Input placeholder={formatMessage({id: "phone.number"})} className="w-full custom-addon" 
                                            disabled={!(isEditing === Editing_Form_Enum.PHONE_NUMBER)}
                                            onBlur={()=> {
                                                if(isEditing === Editing_Form_Enum.PHONE_NUMBER) setIsEditing(undefined)
                                            }}
                                            addonAfter={<img src={editIcon} alt="edit input icon" className="cursor-pointer" onClick={()=>setIsEditing(Editing_Form_Enum.PHONE_NUMBER)}
                                            />}
                                        />
                                </Form.Item>
                                <Form.Item className="mb-0">
                                    <Button type="primary" className="w-full mt-4" htmlType="submit"><FormattedMessage id="update"/></Button>
                                </Form.Item>
                            </Form>
                           
                        </div>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    )
}