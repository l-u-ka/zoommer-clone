import { Menu, Dropdown, Button } from "antd";
import { CSSProperties } from "react";
import type { MenuProps } from 'antd';
import flagGeo from '@src/assets/icons/flag-geo.png'
import flagEng from '@src/assets/icons/flag-eng.png'
import {LANGUAGE_ENUM, TFLAGS} from '@src/@types/language'
import { useLocaleProvider } from "@src/providers/LocaleProvider/useLocaleProvider";

const customStyles:CSSProperties = {
  backgroundColor: 'white',
  border: '1px solid orange',
  display: 'block',
  marginLeft: 'auto',
};
const menuStyles:CSSProperties = {
  border: '1px solid orange',
};
const flags:TFLAGS = {
  [LANGUAGE_ENUM.KA]: flagGeo,
  [LANGUAGE_ENUM.EN]: flagEng,
}

export default function LanguageSelector() {
    const {locale, setLocale} = useLocaleProvider();
    
    console.log(locale)

    const menuItems:MenuProps['items'] = [
      { key: '1', label: 'GEO', onClick: () => setLocale(LANGUAGE_ENUM.KA)},
      { key: '2', label: 'ENG', onClick: () => setLocale(LANGUAGE_ENUM.EN)},
    ];
    const menu = (
        <Menu style={menuStyles} items={menuItems}/>
    );

  return (
    <Dropdown overlay={menu} placement="top"  trigger={['click']}>
      <Button style={customStyles}>
        <div className="flex items-center">
          <img src={flags[locale]} alt="language icon" className="w-[20px] mr-7"/>
          <span style={{ color: 'initial' }} className=" firago-normal text-sm leading-[17px]">{locale}</span>
        </div>
      </Button>
    </Dropdown>
  )
}
