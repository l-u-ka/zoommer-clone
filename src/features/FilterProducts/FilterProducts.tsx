import clearIcon from '@src/assets/icons/clear.png'
import { FormattedMessage } from 'react-intl';
import { Slider, Checkbox, CheckboxProps, ConfigProvider } from 'antd';
import { useProductFiltersProvider } from '@src/providers/ProductFiltersProvider/useProductFiltersProvider';
import { useState } from 'react';
import { useThemeProvider } from '@src/providers/ThemeProvider/useThemeProvider';
import { SORT_BY_ENUM } from '@src/@types/types';
import closeIcon from '@src/assets/icons/close.png'

export default function FilterProducts({closeModal, setSortOrder} : {closeModal?: ()=>void, setSortOrder:React.Dispatch<React.SetStateAction<SORT_BY_ENUM>>}) {

    const {setMaxPrice, setMinPrice, defaultMinPrice, defaultMaxPrice, setIsForSale, isForSale} = useProductFiltersProvider();
    const [isForSaleChecked, setIsForSaleChecked] = useState(false); 
    const [sliderValue, setSliderValue] = useState<[number, number]>([defaultMinPrice, defaultMaxPrice]); // State for slider value

    const {lightMode} = useThemeProvider();

    const onChangeComplete = (value: number[]) => {
      setMinPrice(value[0])
      setMaxPrice(value[1]);
      setSliderValue([value[0], value[1]]);
      if (closeModal) closeModal();
    };

    const onSaleChange: CheckboxProps['onChange'] = (e) => {
      setIsForSale(e.target.checked);
      setIsForSaleChecked(e.target.checked)
      if(closeModal) closeModal();
    };

    const onChange = (value: number[]) => {
      setSliderValue([value[0], value[1]]);
    };

    function clearFilters() {
      setMinPrice(defaultMinPrice);
      setMaxPrice(defaultMaxPrice);
      setSliderValue([defaultMinPrice, defaultMaxPrice]);
      setIsForSale(false);
      setIsForSaleChecked(false);
      setSortOrder(SORT_BY_ENUM.DEFAULT)
    }

    const configTheme = {
      "components": {
        "Slider": {
          "colorBgElevated": lightMode ? "rgb(236, 94, 42)" : "#ee6b3b",
          "handleColor": lightMode ? "rgb(236, 94, 42)" : "#ee6b3b",
          "trackBg": lightMode ? "rgb(236, 94, 42)" : "#ee6b3b",
          "railBg": "rgba(242, 143, 106, 0.5)",
          "railHoverBg": "rgba(242, 143, 106, 0.65)",
          "trackHoverBg": lightMode ? "rgb(236, 94, 42)" : "#ee6b3b",
          "colorPrimaryBorderHover": lightMode ? "rgb(236, 94, 42)" : "#ee6b3b",
          "handleSize": 12,
          "handleSizeHover": 14,
          "railSize": 6,
          "handleLineWidthHover": 10,
          "handleActiveColor": "rgba(22, 119, 255, 0.2)"
        },
        "Checkbox": {
          "colorPrimary": lightMode ? "rgb(236, 94, 42)" : "#ee6b3b",
          "controlInteractiveSize": 20,
          "colorPrimaryHover": lightMode ? "rgb(236, 94, 42)" : "#ee6b3b",
        }
      }
    }

    return (
      <ConfigProvider theme={configTheme}>
        <div /*className='w-[350px] min-w-[350px] hidden lg:block' */ className='w-full'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <img src={closeIcon} alt='close filter modal icon' className=' cursor-pointer block lg:hidden w-3 mr-2' onClick={closeModal}/>
              <h2 className='firago-medium text-base leading-[19px] text-black-main dark:text-dark-black-main'><FormattedMessage id='filter'/></h2>
            </div>
            <div className='inline-flex items-center cursor-pointer'>
              <img src={clearIcon} alt='clear filet icon' className='w-full mr-2'/>
              <h2 className='firago-medium text-xs leading-[14px] opacity-60 text-black-main dark:text-dark-black-main' onClick={clearFilters}><FormattedMessage id='clear'/></h2>
            </div>
          </div>
          <hr className="mt-[22px] mb-[40px] border border-solid border-border-white dark:border-border-dark-white"/>
          <div>
            <h3 className='firago-semibold text-base leading-5 opacity-80 text-black-main dark:text-dark-black-main mb-4'><FormattedMessage id='price'/></h3>
            <Slider
              min={defaultMinPrice}
              max={defaultMaxPrice}
              range
              step={10}
              value={sliderValue}
              onChange={onChange}
              onChangeComplete={onChangeComplete}
            />
            <Checkbox checked={isForSaleChecked} className='mt-8' onChange={onSaleChange} defaultChecked={isForSale}><h3 className='firago-semibold text-base leading-5 opacity-80 text-black-main dark:text-dark-black-main'><FormattedMessage id='for.sale'/></h3></Checkbox>
          </div>
        </div>
      </ConfigProvider>
    )
}
