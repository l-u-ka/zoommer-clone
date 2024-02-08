import clearIcon from '@src/assets/icons/clear.png'
import { FormattedMessage } from 'react-intl';
import { Slider, Checkbox, CheckboxProps, ConfigProvider } from 'antd';
import { useProductFiltersProvider } from '@src/providers/ProductFiltersProvider/useProductFiltersProvider';
import { useState } from 'react';

export default function FilterProducts({closeModal} : {closeModal?: ()=>void}) {

    const {setMaxPrice, setMinPrice, defaultMinPrice, defaultMaxPrice, setIsForSale, isForSale} = useProductFiltersProvider();
    const [isForSaleChecked, setIsForSaleChecked] = useState(false); 
    const [sliderValue, setSliderValue] = useState<[number, number]>([defaultMinPrice, defaultMaxPrice]); // State for slider value


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
    }

    const configTheme = {
      "components": {
        "Slider": {
          "colorBgElevated": "rgb(236, 94, 42)",
          "handleColor": "rgb(236, 94, 42)",
          "trackBg": "rgb(236, 94, 42)",
          "railBg": "rgba(242, 143, 106, 0.5)",
          "railHoverBg": "rgba(242, 143, 106, 0.65)",
          "trackHoverBg": "rgb(236, 94, 42)",
          "colorPrimaryBorderHover": "rgb(236, 94, 42)",
          "handleSize": 12,
          "handleSizeHover": 14,
          "railSize": 6,
          "handleLineWidthHover": 10,
          "handleActiveColor": "rgba(22, 119, 255, 0.2)"
        },
        "Checkbox": {
          "colorPrimary": "rgb(236, 94, 42)",
          "controlInteractiveSize": 20,
          "colorPrimaryHover": "rgb(236, 94, 42)"
        }
      }
    }

    return (
      <ConfigProvider theme={configTheme}>
        <div /*className='w-[350px] min-w-[350px] hidden lg:block' */ className='w-full'>
          <div className='flex justify-between items-center'>
            <h2 className='firago-medium text-base leading-[19px] dark:text-orange-primary'><FormattedMessage id='filter'/></h2>
            <div className='inline-flex items-center cursor-pointer'>
              <img src={clearIcon} alt='clear filet icon' className='w-full mr-2'/>
              <h2 className='firago-medium text-xs leading-[14px] opacity-60 dark:text-orange-primary' onClick={clearFilters}><FormattedMessage id='clear'/></h2>
            </div>
          </div>
          <hr className="mt-[22px] mb-[40px] border border-solid border-white-400"/>
          <div>
            <h3 className='firago-semibold text-base leading-5 opacity-80 dark:text-orange-primary mb-4'><FormattedMessage id='price'/></h3>
            <Slider
              min={defaultMinPrice}
              max={defaultMaxPrice}
              range
              step={10}
              value={sliderValue}
              onChange={onChange}
              onChangeComplete={onChangeComplete}
            />
            <Checkbox checked={isForSaleChecked} className='mt-8' onChange={onSaleChange} defaultChecked={isForSale}><h3 className='firago-semibold text-base leading-5 opacity-80 dark:text-orange-primary'><FormattedMessage id='for.sale'/></h3></Checkbox>
          </div>
        </div>
      </ConfigProvider>
    )
}
