import { Button, ConfigProvider } from "antd";
import { ReactNode } from "react";

interface PrimaryButtonProps {
    onClick?: ()=>void;
    width: string;
    height: number;
    children: ReactNode
}



export default function PrimaryButton({width, height, onClick, children}: PrimaryButtonProps) {

    const customTheme = {
        // algorithm: !lightMode ? darkAlgorithm : defaultAlgorithm,
        "components": {
          "Button": {
            "colorPrimary": "rgb(236, 94, 42)",
            "colorPrimaryHover": "rgb(236, 94, 42)",
            "colorPrimaryActive": "rgb(236, 94, 42)",
            "borderRadius": 12,
            "controlHeight": height,
            "controlHeightLG": height,
            "controlHeightSM": height - height/6,
            "lineHeight": 1.75,
          },
        }
      }

  return (
    <ConfigProvider theme={customTheme}>
        <Button type="primary" onClick={onClick} className={` w-[${width}] flex items-center justify-center hover:scale-95`}>
            {children}
        </Button>
    </ConfigProvider>
  )
}
