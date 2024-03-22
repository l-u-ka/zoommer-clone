import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useNavigate } from 'react-router-dom';
import { ConfigProvider, ThemeConfig} from 'antd';
import AddressForm from './AddressForm/AddressForm';
import CardForm from './CardForm/CardForm';
import { useThemeProvider } from '@src/providers/ThemeProvider/useThemeProvider';
import SuccessModal from './SuccessModal/SuccessModal';
import { usePurchaseProvider } from '@src/providers/PurchaseProvider/usePurchaseProvider';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Helmet } from 'react-helmet-async';

export default function BuyPage() {

    const navigate = useNavigate();
    const {totalPurchaseAmount, totalPurchasePrice} = usePurchaseProvider();
    const [onAdress, setOnAddress] = useState<boolean>(true);
    const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);

    const {lightMode} = useThemeProvider();
    
    const configTheme:ThemeConfig = {
        "components": {
            "Form": {
                "colorError": lightMode ? "rgba(255,0,0,.8)" : "rgba(255, 26, 26, 0.8)",
            },
            "Input": {
              "controlHeight": 50,
              "colorBgContainer": lightMode ? "rgb(242, 242, 242)" :  "rgb(33,36,38)",
              "activeBg": lightMode ? "rgb(255, 255, 255)" : "rgb(24, 26, 27)",
              "activeBorderColor": "rgb(236, 94, 42)",
              "colorBorder": lightMode ? "rgb(242, 242, 242)" : "#34383a",
              "hoverBorderColor": "rgb(236, 94, 42)",
              "activeShadow": "",
              "errorActiveShadow": "",
              "warningActiveShadow": "",
              "borderRadius": 12,
              "fontSize": 14,
              "colorTextPlaceholder": lightMode ? "rgba(0, 0, 0, 0.6)" : "rgba(232, 230, 227, 0.6)",
              "colorText": lightMode ? "#000" : "#e8e6e3",
              "colorError": lightMode ? "rgba(255,0,0,.8)" : "rgba(255, 26, 26, 0.8)",
            },
            "Select": {
                "controlHeight": 85,
                "colorBgContainer": lightMode ? "rgb(242, 242, 242)" :  "rgb(33,36,38)",
                "colorBgElevated": lightMode ? "rgb(242, 242, 242)" :  "rgb(33,36,38)",
                "optionActiveBg": lightMode ? "rgb(255, 255, 255)" : "rgb(24, 26, 27)",
                "colorBorder": lightMode ? "rgb(242, 242, 242)" : "#34383a",
                "optionSelectedBg": "rgba(236, 94, 42, 0.8)",
                "colorPrimary": "rgb(236, 94, 42)",
                "colorPrimaryHover": "rgb(236, 94, 42)",
                "boxShadowSecondary": "",
                "controlOutline": "rgba(255, 255, 255, 0)",
                "fontSize": 16,
                "borderRadius": 12,
                "colorTextPlaceholder": lightMode ? "rgba(0, 0, 0, 0.6)" : "rgba(232, 230, 227, 0.6)",
                "colorText": lightMode ? "#000" : "#e8e6e3",
                "colorError": lightMode ? "rgba(255,0,0,.8)" : "rgba(255, 26, 26, 0.8)",
              }
          }
    }

    function closeModal() {
        setOpenSuccessModal(false);
    }    
    // navigate when either total amount or price is 0 and modal is closed
    useEffect(() => {
        if (openSuccessModal === false && (totalPurchaseAmount === 0 || totalPurchasePrice === 0)) navigate('/')
    }, [openSuccessModal, totalPurchaseAmount, totalPurchasePrice])

    const [parent] = useAutoAnimate({duration: 300, easing: 'ease-in-out'})

    return (
    <>
        <Helmet>
            <title>Purchase Product</title>
            <meta name='purchase' content='Purhcase Product' />
        </Helmet>
        <ConfigProvider theme={configTheme}>
            <div className="custom-container pt-[30px] pb-[60px]">
                <h2 className='firago-bold text-2xl leading-[29px] text-black-main dark:text-dark-black-main'><FormattedMessage id='order.details'/></h2>
                <hr className="mt-[24px] mb-[30px] border border-solid border-border-white dark:border-border-dark-white"/>
                {!(totalPurchaseAmount === 0 || totalPurchasePrice === 0) && (
                    <div className='flex'>
                        <div className='w-full' ref={parent}>
                            {onAdress && <AddressForm setOnAddress={setOnAddress}/>}
                            {!onAdress && <CardForm setOnAddress={setOnAddress} setSuccessModal={setOpenSuccessModal}/>}
                        </div>
                    </div>
                )}
                <SuccessModal modalOpen={openSuccessModal} closeModal={closeModal}/>
            </div>
        </ConfigProvider>
    </>
  )
}
