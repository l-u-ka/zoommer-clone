import { FormattedMessage } from 'react-intl';
import { Slider, Checkbox, CheckboxProps, ConfigProvider } from 'antd';
import { useProductFiltersProvider } from '@src/providers/ProductFiltersProvider/useProductFiltersProvider';
import { useState } from 'react';
import { useThemeProvider } from '@src/providers/ThemeProvider/useThemeProvider';
import { SortEnum } from '@src/@types/types';
import clearIcon from '@src/assets/icons/light/clear.png'
import clearIconDark from '@src/assets/icons/dark/clear.png'
import closeIcon from '@src/assets/icons/light/close.png'
import closeIconDark from '@src/assets/icons/dark/close.png'
import { useNavigate, useParams } from 'react-router-dom';

interface FilterProductsProps {
  closeModal?: ()=>void; 
  setSortOrder:React.Dispatch<React.SetStateAction<SortEnum>>
}

export default function FilterProducts({closeModal, setSortOrder} : FilterProductsProps) {

    const {setMaxPrice, setMinPrice, minPrice, maxPrice, defaultMinPrice, defaultMaxPrice, setIsForSale, isForSale} = useProductFiltersProvider();
    const [isForSaleChecked, setIsForSaleChecked] = useState(false); 
    const [sliderValue, setSliderValue] = useState<[number, number]>([defaultMinPrice, defaultMaxPrice]); // State for slider value
    const {category} = useParams();
    const navigate = useNavigate();

    const {lightMode} = useThemeProvider();

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
          "colorBgContainer": lightMode ? '#FFFFFF' : 'rgb(232, 230, 227)'
        }
      }
    }

    const onChange = (value: number[]) => {
      setSliderValue([value[0], value[1]]);
    };  // set values of the slider based on the user's change values

    const onChangeComplete = (value: number[]) => {
      navigate(`/products/${category}/1`)
      setMinPrice(value[0])
      setMaxPrice(value[1]);
      setSliderValue([value[0], value[1]]);
    };

    const onSaleChange: CheckboxProps['onChange'] = (e) => {
      navigate(`/products/${category}/1`)
      setIsForSale(e.target.checked);
      setIsForSaleChecked(e.target.checked)
    };

    function clearFilters() {
      if (isForSale || (minPrice !== defaultMinPrice) || (maxPrice !== defaultMaxPrice)) navigate(`/products/${category}/1`)
      setMinPrice(defaultMinPrice);
      setMaxPrice(defaultMaxPrice);
      setSliderValue([defaultMinPrice, defaultMaxPrice]);
      setIsForSale(false);
      setIsForSaleChecked(false);
      setSortOrder(SortEnum.DEFAULT)
    }

    function handleMinChange(event: { target: HTMLInputElement; }) {
      setSliderValue(prev => [Number(event.target.value), prev[1]]);
      setMinPrice(Number(event.target.value));
    }
    function handleMaxChange(event: { target: HTMLInputElement; }) {
      setSliderValue(prev => [prev[0], Number(event.target.value)]);
      setMaxPrice(Number(event.target.value));
    }

    return (
      <ConfigProvider theme={configTheme}>
        <div className='w-full'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <img src={lightMode? closeIcon : closeIconDark} alt='close filter modal icon' className=' cursor-pointer block lg:hidden w-3 mr-2' onClick={closeModal}/>
              <h2 className='firago-medium text-base leading-[19px] text-black-main dark:text-dark-black-main'><FormattedMessage id='filter'/></h2>
            </div>
            <div className='inline-flex items-center cursor-pointer'>
              <img src={lightMode ? clearIcon : clearIconDark} alt='clear filet icon' className='w-full mr-2'/>
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
            <div className='w-full flex justify-between mt-11'>
              <div className=' w-[45%] border border-solid border-orange-main rounded-[4px] p-[10px] flex justify-between'>
                  <p className=' firago-normal text-sm leading-5 text-black-main dark:text-dark-black-main opacity-60'>Min: </p>
                  <input className=' bg-transparent border-none focus:outline-none text-end w-full firago-medium text-lg leading-5 text-black-main dark:text-dark-black-main opacity-80 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                  value={sliderValue[0]} onChange={(e)=> handleMinChange(e)} type='number'/>
              </div>
              <div className=' w-[45%] border border-solid border-orange-main rounded-[4px] p-[10px] flex justify-between'>
                  <p className='firago-normal text-sm leading-5 text-black-main dark:text-dark-black-main opacity-60'>Max: </p>
                  <input className=' bg-transparent border-none focus:outline-none text-end w-full firago-medium text-lg leading-5 text-black-main dark:text-dark-black-main opacity-80 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' 
                  value={sliderValue[1]} onChange={(e)=> handleMaxChange(e)} type='number'/>
              </div>
            </div>
            <Checkbox checked={isForSaleChecked} className='mt-8' onChange={onSaleChange} defaultChecked={isForSale}><h3 className='firago-semibold text-base leading-5 opacity-80 text-black-main dark:text-dark-black-main'><FormattedMessage id='for.sale'/></h3></Checkbox>
          </div>
        </div>
      </ConfigProvider>
    )
}
