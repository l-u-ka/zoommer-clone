import { LoadingOutlined } from '@ant-design/icons';
import { useThemeProvider } from '@src/providers/ThemeProvider/useThemeProvider';
import { ConfigProvider, Spin } from 'antd';

interface LoadingSpinnerProps {
    custom: boolean;
    size?: number;
    fullscreen: boolean
}

export default function LoadingSpinner({size, fullscreen, custom} : LoadingSpinnerProps) {

    const {lightMode} = useThemeProvider();
    const configTheme = {
        "components": {
            "Spin": {
              "colorBgMask": lightMode ? "rgba(0, 0, 0, 0.05)" : "rgba(0, 0, 0, 0.9)" ,
              "colorPrimary": lightMode ? '#ec5e2a !important' : '#c1471c !important',
              "dotSize": 80
            }
        }
    }

  return (
    <ConfigProvider theme={configTheme}>
        {(custom && size) ? <Spin indicator={<LoadingOutlined style={{fontSize: size, width: '66px', color: lightMode ? '#ec5e2a' : '#c1471c'}} spin/>} size='large' fullscreen={fullscreen}/>
         : <Spin fullscreen={fullscreen}/>}
    </ConfigProvider>
  )
}
