import { EDITING_FORM_ENUM } from "@src/@types/types";
import useGetUserInfo from "@src/hooks/useGetUserInfo";
import { useAuthProvider } from "@src/providers/AuthProvider/useAuthProvider";
import { privateAxios } from "@src/utils/privateAxios";
import { Button, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import editIcon from '@src/assets/icons/edit-icon.png'

interface TEdit_Form_Values {
    edit_first_name: string;
    edit_last_name: string;
    edit_email: string;
    edit_phone_number: string;
} 

export default function EditProfile() {
    const [form] = Form.useForm();
    const {formatMessage} = useIntl();
    const [isEditing, setIsEditing] = useState<EDITING_FORM_ENUM>();
    const {userData, getNewTokens} = useAuthProvider();
    const [updateLoading, setUpdateLoading] = useState<boolean>(false);
    // const [updateMessage, setUpdateMessage] = useState<string>("");
    const {userInfo, getUserInfo} = useGetUserInfo();
    const [messageApi, contextHolder] = message.useMessage();
    // message.config({
    //     top: 600,
    //     duration: 2,
    //     maxCount: 3,
    //     rtl: true,
    //     prefixCls: 'my-message',
    // });

    function handleFinish(values:TEdit_Form_Values) {
        updateUserInfo(values);
    }

    const success = () => {
        messageApi.open({
          type: 'success',
          content: <FormattedMessage id="update.success"/>,
          duration: 3,
          style: {
            marginTop: '8vh',
          },
        });
      };
    
      const error = () => {
        messageApi.open({
          type: 'error',
          content: <FormattedMessage id="update.fail"/>,
          duration: 3,
          style: {
            marginTop: '8vh',
          },
        });
      };

    async function updateUserInfo(values:TEdit_Form_Values) {
        // setUpdateMessage('')
        try {
            setUpdateLoading(true);
            await privateAxios.put('/user',{
                "email":  values.edit_email,
                "first_name": values.edit_first_name,
                "last_name": values.edit_last_name,
                "phone_number": values.edit_phone_number
             })
             getUserInfo();
            //  setUpdateMessage("success")
            success();
        } catch(err) {
            console.log(err);
            // setUpdateMessage("fail")
            error();
        } finally {
            setUpdateLoading(false);
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
    
    useEffect(()=> {
        if (userInfo) {
            getNewTokens(userInfo.refresh_token);
        }
    }, [userInfo])

    return (
        <div className="flex flex-col lg:w-[400px] w-full">
            {contextHolder}
            {/* <h3 className="mb-[30px] firago-semibold text-lg leading-[22px] text-black-main dark:text-white-400"><FormattedMessage id="edit.profile"/></h3> */}
            <Form<TEdit_Form_Values>
                 // {...formItemLayout}
                form={form}
                name="edit_profile"
                onFinish={handleFinish}
                style={{ maxWidth: '100%'}}
                //scrollToFirstError
            >
            <Form.Item
                name="edit_first_name"
                //rules={[{ required: false, message: <FormattedMessage id="input.name"/>}]}
                className="custom-input"
            >
                <Input placeholder={formatMessage({id: "name"})} className="w-full custom-addon" 
                        disabled={!(isEditing === EDITING_FORM_ENUM.FIRST_NAME)}
                        onBlur={()=> {
                            if(isEditing === EDITING_FORM_ENUM.FIRST_NAME) setIsEditing(undefined)
                        }}
                        addonAfter={<img src={editIcon} alt="edit input icon" className="cursor-pointer" onClick={()=>setIsEditing(EDITING_FORM_ENUM.FIRST_NAME)}/>}
                />
            </Form.Item>
            <Form.Item
                name="edit_last_name"
                    //rules={[{ required: false, message: <FormattedMessage id="input.name"/>}]}
                    className="custom-input"
            >           
                <Input placeholder={formatMessage({id: "surname"})} className="w-full custom-addon" 
                        disabled={!(isEditing === EDITING_FORM_ENUM.LAST_NAME)}
                        onBlur={()=> {
                            if(isEditing === EDITING_FORM_ENUM.LAST_NAME) setIsEditing(undefined)
                        }}
                        addonAfter={<img src={editIcon} alt="edit input icon" className="cursor-pointer" onClick={()=>setIsEditing(EDITING_FORM_ENUM.LAST_NAME)}/>}
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
                    disabled={!(isEditing === EDITING_FORM_ENUM.EMAIL)}
                    onBlur={()=> {
                            if(isEditing === EDITING_FORM_ENUM.EMAIL) setIsEditing(undefined)
                    }}
                    addonAfter={<img src={editIcon} alt="edit input icon" className="cursor-pointer" onClick={()=>setIsEditing(EDITING_FORM_ENUM.EMAIL)}/>}
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
                                if (/^\d+$/.test(value)) return Promise.resolve();
                                    return Promise.reject(new Error(formatMessage({ id: 'input.phone.number.invalid' })));
                                },
                            },
                        ]}
            >
                <Input placeholder={formatMessage({id: "phone.number"})} className="w-full custom-addon" 
                        disabled={!(isEditing === EDITING_FORM_ENUM.PHONE_NUMBER)}
                        onBlur={()=> {
                            if(isEditing === EDITING_FORM_ENUM.PHONE_NUMBER) setIsEditing(undefined)
                        }}
                        addonAfter={<img src={editIcon} alt="edit input icon" className="cursor-pointer" onClick={()=>setIsEditing(EDITING_FORM_ENUM.PHONE_NUMBER)}/>}
                />
            </Form.Item>
            <Form.Item className="mb-0">
                                    {/* {updateMessage && <p className={`firago-medium text-base leading-5 ${updateMessage==="update.success" ? 'text-green-600' : 'text-red-08'}`}><FormattedMessage id={`${updateMessage}`}/></p>} */}
                <Button loading={updateLoading} type="primary" className="w-full mt-4" htmlType="submit"><FormattedMessage id="update"/></Button>
            </Form.Item>
        </Form>
    </div>
  )
}
