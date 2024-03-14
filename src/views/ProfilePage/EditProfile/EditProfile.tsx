import { EditFormEnum, ProfileMenuEnum } from "@src/@types/types";
import { useAuthProvider } from "@src/providers/AuthProvider/useAuthProvider";
import { privateAxios } from "@src/utils/privateAxios";
import { Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useThemeProvider } from "@src/providers/ThemeProvider/useThemeProvider";
import editIcon from '@src/assets/icons/light/edit-icon.png'
import editIconDark from '@src/assets/icons/dark/edit-icon.png'
import PrimaryButton from "@src/components/PrimaryButton/PrimaryButton";
import useGetUserInfo from "@src/hooks/useGetUserInfo";
import EditFormSkeleton from "@src/components/Skeletons/EditFormSkeleton/EditFormSkeleton";


interface EditFormValues {
    edit_first_name: string;
    edit_last_name: string;
    edit_email: string;
    edit_phone_number: string;
} 

export default function EditProfile({updateLoading, setUpdateLoading}: {updateLoading: boolean, setUpdateLoading: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [editForm] = Form.useForm();
    const {formatMessage} = useIntl();
    const [isEditing, setIsEditing] = useState<EditFormEnum>();
    const {userData, getNewTokens} = useAuthProvider();
    const {lightMode} = useThemeProvider();
    const {userInfo, getUserInfo} = useGetUserInfo();
    const [messageApi, contextHolder] = message.useMessage();

    function handleFinish(values:EditFormValues) {
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

    async function updateUserInfo(values:EditFormValues) {
        try {
            setUpdateLoading(true);
            await privateAxios.put('/user',{
                "email":  values.edit_email,
                "first_name": values.edit_first_name,
                "last_name": values.edit_last_name,
                "phone_number": values.edit_phone_number
             })
             getUserInfo();
            success();
        } catch(err) {
            console.error(err);
            error();
        } finally {
            setUpdateLoading(false);
        }
    }

    useEffect(()=> {
        editForm.setFieldsValue({
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
            <h2 className="mb-[30px] firago-semibold text-lg leading-[22px] text-black-main dark:text-dark-black-main hidden lg:block"><FormattedMessage id={ProfileMenuEnum.ON_EDITING}/></h2>
            {/* skeletons for form input when user data is updating */}
            {updateLoading ? <EditFormSkeleton/>
            : (
            <Form<EditFormValues>
                form={editForm}
                name="edit_form"
                onFinish={handleFinish}
                style={{ maxWidth: '100%'}}
            >
                <Form.Item
                    name="edit_first_name"
                    className="custom-input"
                >
                    <Input placeholder={formatMessage({id: "name"})} className="w-full custom-addon" 
                            disabled={!(isEditing === EditFormEnum.FIRST_NAME)}
                            onBlur={()=> {
                                if(isEditing === EditFormEnum.FIRST_NAME) setIsEditing(undefined)
                            }}
                            addonAfter={<img src={lightMode ? editIcon : editIconDark} alt="edit input icon" className="cursor-pointer" onClick={()=>setIsEditing(EditFormEnum.FIRST_NAME)}/>}
                    />
                </Form.Item>
                <Form.Item
                    name="edit_last_name"
                        className="custom-input"
                >           
                    <Input placeholder={formatMessage({id: "surname"})} className="w-full custom-addon" 
                            disabled={!(isEditing === EditFormEnum.LAST_NAME)}
                            onBlur={()=> {
                                if(isEditing === EditFormEnum.LAST_NAME) setIsEditing(undefined)
                            }}
                            addonAfter={<img src={lightMode ? editIcon : editIconDark} alt="edit input icon" className="cursor-pointer" onClick={()=>setIsEditing(EditFormEnum.LAST_NAME)}/>}
                    />
                </Form.Item>
                <Form.Item
                    name="edit_email"
                    className="custom-input"
                    rules={[
                            {
                                type: 'email',
                                message: <FormattedMessage id="input.email.valid"/>,
                            },
                        ]}
                >
                    <Input placeholder={formatMessage({id: "email"})} className="w-full custom-addon" 
                        disabled={!(isEditing === EditFormEnum.EMAIL)}
                        onBlur={()=> {
                                if(isEditing === EditFormEnum.EMAIL) setIsEditing(undefined)
                        }}
                        addonAfter={<img src={lightMode ? editIcon : editIconDark} alt="edit input icon" className="cursor-pointer" onClick={()=>setIsEditing(EditFormEnum.EMAIL)}/>}
                    />
                </Form.Item>
                <Form.Item
                    name="edit_phone_number"
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
                            disabled={!(isEditing === EditFormEnum.PHONE_NUMBER)}
                            onBlur={()=> {
                                if(isEditing === EditFormEnum.PHONE_NUMBER) setIsEditing(undefined)
                            }}
                            addonAfter={<img src={lightMode ? editIcon : editIconDark} alt="edit input icon" className="cursor-pointer" onClick={()=>setIsEditing(EditFormEnum.PHONE_NUMBER)}/>}
                    />
                </Form.Item>
                <Form.Item className="mb-0">
                    <PrimaryButton loading={updateLoading} height={50} width="100%" onClick={()=>{editForm.submit()}}><h3 className="firago-bold text-sm leading-[17px] text-white dark:black-main"><FormattedMessage id="update"/></h3></PrimaryButton>
                </Form.Item>
            </Form>
            )}
    </div>
  )
}
