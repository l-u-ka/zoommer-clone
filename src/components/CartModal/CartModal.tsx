import emptyCart from '@src/assets/icons/emptybag.png'
import { Button, ConfigProvider } from "antd";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { useCartProvider } from "@src/providers/CartProvider/useCartProvider";
import CartProducts from '../CartProducts/CartProducts';
import { getFullPrice } from '@src/utils/exportFunctions';
import { useGlobalProvider } from '@src/providers/GlobalProvider/useGlobalProvider';
import { useAuthProvider } from '@src/providers/AuthProvider/useAuthProvider';
import { Auth_Stage_Enum } from '@src/providers/AuthProvider/AuthContext';
import { useThemeProvider } from '@src/providers/ThemeProvider/useThemeProvider';

interface CartModalProps {
    //openModal: () => void;
    closeModal?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}



export default function CartModal({closeModal} : CartModalProps) {
    const {cartItems} = useCartProvider();
    const navigate = useNavigate();
    const {setLoginModalOpen} = useGlobalProvider();
    const {authStage} = useAuthProvider();
    const {lightMode} = useThemeProvider();

    const customTheme = {
        "components": {
          "Button": {
            "colorPrimary": lightMode ? "rgb(236, 94, 42) !important" : "#c1471c !important",
            "colorPrimaryHover": lightMode ? "#c1471c !important" : "rgb(236, 94, 42) !important",
            "colorPrimaryActive": lightMode ? "#c1471c !important" : "rgb(236, 94, 42) !important",
            "borderRadius": 12,
            "controlHeight": 40,
            "controlHeightLG": 40,
            "controlHeightSM": 25,
            "lineHeight": 1.0625
          }
        }
    }

    function handleClick() {
        if (authStage === Auth_Stage_Enum.AUTHORIZED) navigate("/cart");
        else setLoginModalOpen(true);
    }

    return (
        <ConfigProvider theme={customTheme}>
            {/* <div onMouseLeave={closeModal} onMouseEnter={openModal} className="absolute top-[60px] right-[5%] xl:right-[20%] bg-light-theme-bg dark:bg-dark-theme-bg w-[350px] h-[300px] rounded-xl border border-solid border-orange-main">CartModal</div> */}
            <div onMouseLeave={closeModal} className="grid grid-cols-1 gap-[15px] absolute top-[70px] py-4 px-5 right-[70px] bg-light-theme-bg dark:bg-dark-theme-bg w-[350px] rounded-xl border border-solid border-orange-main">
                <div className="flex justify-between">
                    <h4 className="firago-semibold text-black-08 dark:text-dark-black-8 text-sm leading-[17px]"><FormattedMessage id="cart"/></h4>
                    <h4 className="firago-medium text-black-07 dark:text-dark-black-07 text-xs leading-[14px]">{cartItems.length} <FormattedMessage id="product"/></h4>
                </div>
                <div>
                    {(cartItems.length ===0) && <img src={emptyCart} alt="empty cart icon" className="h-[150px] mx-auto block"/>}
                    {(cartItems.length >=1) && <div className='max-h-[180px] overflow-y-auto'>
                        <CartProducts/>
                    </div>}
                </div>
                <div>
                    <h4 className="text-right firago-medium text-black-07 dark:text-dark-black-07 text-xs leading-[14px]"><FormattedMessage id="sum.price"/>: <span className="firago-bold text-base leading-[19px] text-black-08 dark:text-dark-black-8">{getFullPrice(cartItems)} ₾</span></h4>
                    <Button type="primary" className="firago-medium mx-auto block mt-4" onClick={handleClick}><FormattedMessage id="open.cart"/></Button>
                </div>
            </div>
        </ConfigProvider>
    )
}
