import { useAuthProvider } from "@src/providers/AuthProvider/useAuthProvider";
import { useThemeProvider } from "@src/providers/ThemeProvider/useThemeProvider";
import { Button, ConfigProvider, Modal} from "antd"
import { FormattedMessage } from "react-intl";
import closeIcon from '@src/assets/icons/mobile-modal-close.png'

interface LogoutModalProps {
    modalOpen: boolean;
    closeModal: () => void;
}

export default function LogoutModal({modalOpen, closeModal}:LogoutModalProps) {

    const {logout} = useAuthProvider();
    const {lightMode} = useThemeProvider();
    const modalStyle = {
        "components": {
            "Button": {
                "colorPrimary": lightMode ? "rgb(236, 94, 42) !important" : "#c1471c !important",
                "colorPrimaryHover": lightMode ? "#c1471c !important" : "rgb(236, 94, 42) !important",
                "colorPrimaryActive": lightMode ? "#c1471c !important" : "rgb(236, 94, 42) !important",
                "defaultBg": lightMode ? "#FFF" : "rgb(24, 26, 27)",
                "defaultColor" : lightMode ? "rgb(236, 94, 42) !important" : "#c1471c !important",
                "borderRadius": 12,
                "controlHeight": 50,
                "controlHeightLG": 50,
                "controlHeightSM": 30,
                "lineHeight": 1.75,
                "defaultBorderColor": "rgb(250, 84, 28)",
              },
          }
    }

    return <ConfigProvider theme={modalStyle}>
        <Modal open={modalOpen} onCancel={closeModal} maskClosable={false} footer={false} className="max-w-[400px]" closeIcon={<img className="relative top-[-8px] w-auto" src={closeIcon} alt="modal close icon"/>}>
            <div>
                <h3 className="firago-medium text-base leading-[19px] text-center mb-[15px] text-black-main dark:text-dark-black-main"><FormattedMessage id="logout"/></h3>
                <hr className="border border-solid border-border-white dark:border-border-dark-white"/>
                <h4 className="mt-[40px] mb-[20px] firago-semibold text-base leading-[19px] text-center text-black-main dark:text-dark-black-main"><FormattedMessage id="logout.sure"/></h4>
                <h4 className="firago-semibold text-base leading-[19px] text-center text-black-06 dark:text-dark-black-06"><FormattedMessage id="information.might.lost"/></h4>
                <div className="flex justify-between mt-[40px]">
                    <Button type="default" className="w-[48%]" onClick={logout}><p className="firago-bold leading-[17px] text-sm"><FormattedMessage id="yes"/></p></Button>
                    <Button type="primary" className="w-[48%]" onClick={closeModal}><p className="firago-bold leading-[17px] text-sm"><FormattedMessage id="no"/></p></Button>
                </div>
            </div>
        </Modal>
    </ConfigProvider> 
}