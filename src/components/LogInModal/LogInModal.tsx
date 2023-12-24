import { useState } from "react"
import { Modal } from "antd"
import closeIcon from '@src/assets/icons/mobile-modal-close.png'
import AuthorizationForm from "./AuthorizationForm/AuthorizationForm"
import RegistrationForm from "./RegistrationForm/RegistrationForm"
import { FormattedMessage } from "react-intl"

interface ModalProps {
    modalOpen: boolean;
    closeModal: () => void;
}

export default function LogInModal({modalOpen, closeModal} : ModalProps) {
    const [onAuthorization, setOnAuthorization] = useState<boolean>(true);

  return (
    <Modal open={modalOpen} footer={false} onCancel={closeModal} className="custom-modal" closeIcon={<img src={closeIcon} alt="modal close icon"/>}>
        <div className="flex">
            <div className="w-1/2 cursor-pointer" onClick={()=>setOnAuthorization(true)}>
                <p className={`${onAuthorization ? 'firago-bold' : 'firago-normal'} text-center text-base leading-[19px] mt-2 mb-[14px]`}><FormattedMessage id="authorization"/></p>
                <hr className={`border border-solid ${onAuthorization ? ' border-orange-primary' : 'border-gray-primary'}`}/>
            </div>
            <div className="w-1/2 cursor-pointer" onClick={()=>setOnAuthorization(false)}>
                <p className={`${!onAuthorization ? 'firago-bold' : 'firago-normal'} text-center text-base leading-[19px] mt-2 mb-[14px]`}><FormattedMessage id="registration"/></p>
                <hr className={`border border-solid ${!onAuthorization ? ' border-orange-primary' : 'border-gray-primary'}`}/>
            </div>
        </div>
        <div className="pt-5">
            {onAuthorization ? <AuthorizationForm/> : <RegistrationForm/>}
        </div>
    </Modal>
  )
}
