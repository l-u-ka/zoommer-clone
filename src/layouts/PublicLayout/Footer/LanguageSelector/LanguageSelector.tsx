import { Menu, Dropdown, Button } from "antd";
import { CSSProperties } from "react";
import type { MenuProps } from 'antd';
import flagGeo from '@src/assets/icons/flag-geo.png'
import flagEng from '@src/assets/icons/flag-eng.png'
import {LANGUAGE_ENUM, TFLAGS} from '@src/@types/language'
import { useGlobalProvider } from "@src/providers/GlobalProvider/useGlobalProvider";

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
  [LANGUAGE_ENUM.GEO]: flagGeo,
  [LANGUAGE_ENUM.ENG]: flagEng,
}

export default function LanguageSelector() {
    const {selectedLanguage, setSelectedLanguage} = useGlobalProvider();
    
    const menuItems:MenuProps['items'] = [
      { key: '1', label: 'GEO', onClick: () => setSelectedLanguage(LANGUAGE_ENUM.GEO)},
      { key: '2', label: 'ENG', onClick: () => setSelectedLanguage(LANGUAGE_ENUM.ENG)},
    ];
    const menu = (
        <Menu style={menuStyles} items={menuItems}/>
    );

  return (
    <Dropdown overlay={menu} placement="top"  trigger={['click']}>
      <Button style={customStyles}>
        <div className="flex items-center">
          <img src={flags[selectedLanguage]} alt="language icon" className="w-[20px] mr-7"/>
          <span style={{ color: 'initial' }}>{selectedLanguage}</span>
        </div>
      </Button>
    </Dropdown>
  )
}
