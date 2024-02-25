import { CartITem, ProductType } from '@src/@types/types';
import { useBuyProduct } from '@src/hooks/useBuyProduct'
import { useGetBoughtProducts } from '@src/hooks/useGetBoughtProducts';
import { useGlobalProvider } from '@src/providers/GlobalProvider/useGlobalProvider';
import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useNavigate } from 'react-router-dom';
import { ConfigProvider, Form, Input, Select, theme} from 'antd';
import AddressForm from './AddressForm/AddressForm';
import CardForm from './CardForm/CardForm';
import { useThemeProvider } from '@src/providers/ThemeProvider/useThemeProvider';
import SuccessModal from './SuccessModal/SuccessModal';
import MobilePurchaseCard from '@src/views/BuyPage/MobilePurchaseCard/MobilePurchaseCard';


export default function BuyPage() {

    const {buyProduct} = useBuyProduct();
    const {boughtProducts} = useGetBoughtProducts();
    const navigate = useNavigate();
    const {totalPurchaseAmount, totalPurchasePrice, setIsBuyingFromCart} = useGlobalProvider();
    const [onAdress, setOnAddress] = useState<boolean>(true);
    const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);

    const {lightMode} = useThemeProvider();
    const {defaultAlgorithm, darkAlgorithm} = theme;

    const configTheme = {
        // algorithm: !lightMode ? darkAlgorithm : defaultAlgorithm,
        "components": {
            "Input": {
              "controlHeight": 50,
              "colorBgContainer": "rgb(242, 242, 242)",
              "activeBg": "rgb(255, 255, 255)",
              "activeBorderColor": "rgb(236, 94, 42)",
              "colorBorder": "rgb(242, 242, 242)",
              "hoverBorderColor": "rgb(236, 94, 42)",
              "activeShadow": "",
              "errorActiveShadow": "",
              "warningActiveShadow": "",
              "borderRadius": 12,
              "fontSize": 14,
              "colorTextPlaceholder": "rgba(0, 0, 0, 0.6)",
            },
            "Select": {
                "controlHeight": 85,
                "colorBgContainer": "rgb(242, 242, 242)",
                "colorBgElevated": "rgb(242, 242, 242)",
                "optionActiveBg": "rgb(255, 255, 255)",
                "optionSelectedBg": "rgba(236, 94, 42, 0.8)",
                "colorPrimary": "rgb(236, 94, 42)",
                "colorPrimaryHover": "rgb(236, 94, 42)",
                "boxShadowSecondary": "",
                "controlOutline": "rgba(255, 255, 255, 0)",
                "fontSize": 16,
                "borderRadius": 12,
                "colorTextPlaceholder": "rgba(0, 0, 0, 0.6)",
              }
          }
    }

    console.log("IS ON ADDRESS: ",onAdress)
    console.log("Total Amount: ",totalPurchaseAmount);
    console.log("Total Price: ",totalPurchasePrice);

    function closeModal() {
        setOpenSuccessModal(false);
    }    
    // navigate when either total amount or price is 0 and modal is closed
    useEffect(() => {
        if (openSuccessModal === false && (totalPurchaseAmount === 0 || totalPurchasePrice === 0)) navigate('/')
    }, [openSuccessModal, totalPurchaseAmount, totalPurchasePrice])

    return (
        <ConfigProvider theme={configTheme}>
            <div className="custom-container pt-[30px] pb-[60px] min-h-screen">
                <h2 className='firago-bold text-2xl leading-[29px] dark:text-white-400'><FormattedMessage id='order.details'/></h2>
                <hr className="mt-[24px] mb-[30px] border border-solid border-white-400"/>
                {!(totalPurchaseAmount === 0 || totalPurchasePrice === 0) && (
                    <div className='flex'>
                    <div className='w-full'>
                        {onAdress && <AddressForm setOnAddress={setOnAddress}/>}
                        {!onAdress && <CardForm setOnAddress={setOnAddress} setSuccessModal={setOpenSuccessModal}/>}
                    </div>
                </div>
                )}
                <SuccessModal modalOpen={openSuccessModal} closeModal={closeModal}/>
            </div>
        </ConfigProvider>
  )
}
