import { useGlobalProvider } from "@src/providers/GlobalProvider/useGlobalProvider";
import emptyCart from '@src/assets/icons/emptybag.png'
import { Button, ConfigProvider } from "antd";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

interface CartModalProps {
    //openModal: () => void;
    closeModal?: () => void;
}

const customTheme = {
    "components": {
      "Button": {
        "colorPrimary": "rgb(236, 94, 42)",
        "colorPrimaryHover": "rgb(236, 94, 42)",
        "colorPrimaryActive": "rgb(236, 94, 42)",
        "borderRadius": 12,
        "controlHeight": 40,
        "controlHeightLG": 40,
        "controlHeightSM": 25,
        "lineHeight": 1.0625
      }
    }
  }

export default function CartModal({closeModal} : CartModalProps) {
    const {cartItems} = useGlobalProvider();
    const navigate = useNavigate();

    return (
        <ConfigProvider theme={customTheme}>
            {/* <div onMouseLeave={closeModal} onMouseEnter={openModal} className="absolute z-10 top-[60px] right-[5%] xl:right-[20%] bg-white dark:bg-dark-theme-bg w-[350px] h-[300px] rounded-xl border border-solid border-orange-primary">CartModal</div> */}
            <div onMouseLeave={closeModal} className="grid grid-cols-1 gap-[15px] absolute z-10 top-[60px] py-4 px-5 right-[5%] xl:right-[20%] bg-white dark:bg-dark-theme-bg w-[350px] rounded-xl border border-solid border-orange-primary">
                <div className="flex justify-between">
                    <h4 className="firago-semibold text-black-08 dark:text-white text-sm leading-[17px]"><FormattedMessage id="cart"/></h4>
                    <h4 className="firago-normal text-black-07 dark:text-white text-xs leading-[14px]">{cartItems.length} <FormattedMessage id="product"/></h4>
                </div>
                <div>
                {(cartItems.length ===0) && <img src={emptyCart} alt="empty cart icon" className="h-[150px] mx-auto block"/>}
                </div>
                <div>
                    <h4 className="text-right firago-normal text-black-07 dark:text-white text-xs leading-[14px]"><FormattedMessage id="sum.price"/>: <span className="firago-bold text-base leading-[19px] text-black-08 dark:text-white">0 ₾</span></h4>
                    <Button type="primary" className="firago-normal mx-auto block mt-4" onClick={()=>navigate("/cart")}><FormattedMessage id="open.cart"/></Button>
                </div>
            </div>
        </ConfigProvider>
    )
}
