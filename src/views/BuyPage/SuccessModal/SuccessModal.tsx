import { useThemeProvider } from '@src/providers/ThemeProvider/useThemeProvider';
import { ConfigProvider, Modal, ThemeConfig} from 'antd';
import closeIcon from '@src/assets/icons/mobile-modal-close.png'
import { FormattedMessage } from 'react-intl';
import successImg from '@src/assets/icons/successImg.png'
import PrimaryButton from '@src/components/PrimaryButton/PrimaryButton';

interface SuccessModalProps {
  modalOpen: boolean;
  closeModal: () => void
}

export default function SuccessModal({modalOpen, closeModal} : SuccessModalProps) {
    const {lightMode} = useThemeProvider();

    const configStyle:ThemeConfig = {
        "components": {
            "Modal": {
              "borderRadiusLG": 20,
              "borderRadiusSM": 10,
              "contentBg": lightMode ? "#FFFFFF" : "rgb(24, 26, 27)"
            },
          }
    }

  return (
    <ConfigProvider theme={configStyle}>
        <Modal centered open={modalOpen} onCancel={closeModal} maskClosable={false} footer={false} className="!w-[55%] lg:!w-[50%]" closeIcon={<img className="relative top-[-8px] w-auto" src={closeIcon} alt="modal close icon"/>}>
                <div>
                    <h3 className="firago-medium text-base leading-[19px] text-center mt-5 text-black-main dark:text-dark-black-main"><FormattedMessage id='congrats.bought.success'/></h3>
                    <img src={successImg} alt='success img' className='w-[240px] block mx-auto my-12'/>
                    <div className="flex justify-between">
                        <PrimaryButton width='100%' height={50} onClick={closeModal}><h3 className='firago-bold text-base leading-[19px] text-white'><FormattedMessage id='close'/></h3></PrimaryButton>
                    </div>
                </div>
        </Modal>
    </ConfigProvider>
  )
}
