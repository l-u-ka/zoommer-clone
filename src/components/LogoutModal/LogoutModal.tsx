import { useAuthProvider } from "@src/providers/AuthProvider/useAuthProvider";
import { useThemeProvider } from "@src/providers/ThemeProvider/useThemeProvider";
import { Button, ConfigProvider, Modal, theme } from "antd"
import { FormattedMessage } from "react-intl";
import closeIcon from '@src/assets/icons/mobile-modal-close.png'

interface LogoutModalProps {
    modalOpen: boolean;
    closeModal: () => void;
}


export default function LogoutModal({modalOpen, closeModal}:LogoutModalProps) {

    const {logout} = useAuthProvider();
    const {lightMode} = useThemeProvider();
    const {defaultAlgorithm, darkAlgorithm} = theme;
    const modalStyle = {
        algorithm: !lightMode ? darkAlgorithm : defaultAlgorithm,
        "Button": {
            
        }
    }

    return <ConfigProvider theme={modalStyle}>
        <Modal open={modalOpen} onCancel={closeModal} maskClosable={false} footer={false} className="max-w-[400px]" closeIcon={<img className="relative top-[-8px]" src={closeIcon} alt="modal close icon"/>}>
            <div>
                <h3 className="firago-medium text-base leading-[19px] text-center mb-[15px] dark:text-white"><FormattedMessage id="logout"/></h3>
                <hr className="border border-solid border-white-400"/>
                <h4 className="mt-[40px] mb-[20px] firago-semibold text-base leading-[19px] text-center text-black-main dark:text-white">დარწმუნებული ხართ რომ გინდათ გასვლა?</h4>
                <h4 className="firago-semibold text-base leading-[19px] text-center text-black-06 dark:text-white-600">თქვენი ნივთები შესაძლოა დაიკარგოს</h4>
                <div className="flex justify-between mt-[40px]">
                    <Button type="default" className="w-[48%] custom-button" onClick={logout}>დიახ</Button>
                    <Button type="primary" className="w-[48%] custom-button" onClick={closeModal}>არა</Button>
                </div>
            </div>
        </Modal>
    </ConfigProvider> 
}