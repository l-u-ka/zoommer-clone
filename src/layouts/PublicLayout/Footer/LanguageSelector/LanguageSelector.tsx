import {Dropdown, Button } from "antd";
import {CSSProperties} from "react";
import type { MenuProps } from 'antd';
import flagGeo from '@src/assets/icons/flag-geo.png'
import flagEng from '@src/assets/icons/flag-eng.png'
import {LanguageEnum, Flags} from '@src/@types/types'
import { useLocaleProvider } from "@src/providers/LocaleProvider/useLocaleProvider";
import { useThemeProvider } from "@src/providers/ThemeProvider/useThemeProvider";



const flags:Flags = {
  [LanguageEnum.KA]: flagGeo,
  [LanguageEnum.EN]: flagEng,
}

export default function LanguageSelector() {
    const {locale, setLocale} = useLocaleProvider();
    const {lightMode} = useThemeProvider();

    const customStyles:CSSProperties = {
      backgroundColor: lightMode ? 'white' : 'rgb(24, 26, 27)',
      border: `1px solid ${lightMode ? '#ec5e2a' : '#c1471c'}`,
      display: 'block',
      marginLeft: 'auto',
    };
    const menuStyles:CSSProperties = {
      border: `1px solid ${lightMode ? '#ec5e2a' : '#c1471c'}`,
      backgroundColor: lightMode ? 'white' : 'rgb(24, 26, 27)',
    };

    const menuItems:MenuProps['items'] = [
      { key: '1', 
        label: <p className="firago-medium text-black dark:!text-dark-black-main">GEO</p>, 
        onClick: () => {
          setLocale(LanguageEnum.KA)
          localStorage.setItem('locale', LanguageEnum.KA)
      }},
      { key: '2', 
        label: <p className="firago-medium text-black dark:!text-dark-black-main">ENG</p>, 
        onClick: () => {
          setLocale(LanguageEnum.EN)
          localStorage.setItem('locale', LanguageEnum.EN)
      }},
    ];
   
  return (
    <Dropdown menu={{items: menuItems, style: menuStyles}} placement="top" trigger={['click']}>
      <Button style={customStyles}>
        <div className="flex items-center">
          <img src={flags[locale]} alt="language icon" className="w-[20px] mr-7"/>
          <span style={{ color: 'initial' }} className="firago-medium text-sm leading-[17px] text-black dark:!text-dark-black-main">{locale}</span>
        </div>
      </Button>
    </Dropdown>
  )
}
