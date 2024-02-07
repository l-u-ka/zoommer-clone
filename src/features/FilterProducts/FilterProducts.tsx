import clearIcon from '@src/assets/icons/clear.png'
import { FormattedMessage } from 'react-intl';
import { Slider, Checkbox, CheckboxProps, ConfigProvider } from 'antd';
import { useProductFiltersProvider } from '@src/providers/ProductFiltersProvider/useProductFiltersProvider';

export default function FilterProducts() {

    const {setMaxPrice, setMinPrice, minPrice, maxPrice, defaultMinPrice, defaultMaxPrice, setIsForSale, isForSale} = useProductFiltersProvider();
      
    const onChangeComplete = (value: number[]) => {
      setMinPrice(value[0])
      setMaxPrice(value[1]);
    };

    const onSaleChange: CheckboxProps['onChange'] = (e) => {
      setIsForSale(e.target.checked)
    };

    function clearFilters() {
      setMinPrice(defaultMinPrice);
      setMaxPrice(defaultMaxPrice);
      setIsForSale(false);
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
        <div className='w-[350px] min-w-[350px] hidden lg:block'>
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
              defaultValue={[minPrice, maxPrice]}
              // onChange={onChange}
              onChangeComplete={onChangeComplete}
            />
            <Checkbox className='mt-8' onChange={onSaleChange} defaultChecked={isForSale}><h3 className='firago-semibold text-base leading-5 opacity-80 dark:text-orange-primary'><FormattedMessage id='for.sale'/></h3></Checkbox>
          </div>
        </div>
      </ConfigProvider>
    )
}
