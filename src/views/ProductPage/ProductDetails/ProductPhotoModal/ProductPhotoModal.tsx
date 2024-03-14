import { useThemeProvider } from "@src/providers/ThemeProvider/useThemeProvider";
import { ConfigProvider, Modal, ThemeConfig } from "antd";
import closeIcon from '@src/assets/icons/mobile-modal-close.png'
import { Product } from "@src/@types/types";

interface ProductPhotoModalProps {
    modalOpen: boolean;
    closeModal: () => void;
    product: Product
}

export default function ProductPhotoModal({modalOpen, closeModal, product} : ProductPhotoModalProps) {
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
            <Modal centered open={modalOpen} onCancel={closeModal} maskClosable={true} footer={false} className="!w-[75%] md:!w-[600px] flex items-center justify-center" closeIcon={<img className="relative top-[-8px] w-[30px]" src={closeIcon} alt="modal close icon"/>}>
                <img src={product.image} alt="product image" className="w-full min-h-[350px] max-h-[500px] object-scale-down"/>
        </Modal>
        </ConfigProvider>
    )
}
