import { FormattedMessage } from "react-intl"
import cartButtonIcon from '@src/assets/icons/cart-button.png'
import { Button, ConfigProvider, ThemeConfig } from "antd"

export default function AddCartButton({height, borderRadius} : {height: number, borderRadius: number}) {

  const customTheme:ThemeConfig = {
    "components": {
      "Button": {
        "colorPrimary": "rgb(242, 143, 106)",
        "colorPrimaryHover": "rgb(242, 143, 106)",
        "colorPrimaryActive": "rgb(236, 94, 42)",
        "borderRadius": borderRadius,
        "controlHeight": height,
        "controlHeightLG": height,
        "controlHeightSM": height,
        "lineHeight": 1.0625
      }
    }
  }


  return (
    // <button style={{height: height}} className="border-none bg-[#f28f6a] rounded cursor-pointer hover:scale-95 transition-all ease-in-out">
    <ConfigProvider theme={customTheme}>
        <Button type="primary" className="flex justify-center items-center hover:scale-95 transition-all ease-in-out w-full">
          <div className="inline-flex items-center mx-auto">
              <img src={cartButtonIcon} className="w-[14px] mr-[10px]"/>
              <p className="text-black firago-semibold text-xs leading-5 opacity-80"><FormattedMessage id="add"/></p>
          </div>
        </Button>
      </ConfigProvider>
    // </button>
  )
}
