import { useThemeProvider } from "@src/providers/ThemeProvider/useThemeProvider";
import { Button, ConfigProvider } from "antd";
import { ReactNode } from "react";

interface PrimaryButtonProps {
    onClick?: ()=>void;
    width: string;
    height: number;
    children: ReactNode;
    loading?: boolean;
}


export default function PrimaryButton({width, height, onClick, children, loading}: PrimaryButtonProps) {

    const {lightMode} = useThemeProvider();

    const customTheme = {
        "components": {
          "Button": {
            "colorPrimary": lightMode ? "rgb(236, 94, 42) !important" : "#c1471c !important",
            "colorPrimaryHover": lightMode ? "#c1471c !important" : "rgb(236, 94, 42) !important",
            "colorPrimaryActive": lightMode ? "#c1471c !important" : "rgb(236, 94, 42) !important",
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
        <Button type="primary" onClick={onClick} className={` w-[${width}] flex items-center justify-center hover:scale-95`} loading={loading ? loading : undefined}>
            {children}
        </Button>
    </ConfigProvider>
  )
}
