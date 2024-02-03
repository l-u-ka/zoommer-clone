import clearIcon from '@src/assets/icons/clear.png'
import { FormattedMessage } from 'react-intl';
import { Slider, Checkbox, CheckboxProps } from 'antd';


export default function FilterProducts() {

    // const onChange = (value: number | number[]) => {
    //     console.log('onChange: ', value);
    //   };
      
      const onChangeComplete = (value: number | number[]) => {
        console.log('onChangeComplete: ', value);
      };

      const onSaleChange: CheckboxProps['onChange'] = (e) => {
        // console.log(`checked = ${e.target.checked}`);
        console.log(e.target.checked)
      };

  return (
    <div className='w-[350px] min-w-[350px] hidden lg:block'>
              <div className='flex justify-between items-center'>
                <h2 className='firago-medium text-base leading-[19px] dark:text-orange-primary'><FormattedMessage id='filter'/></h2>
                <div className='inline-flex items-center cursor-pointer'>
                  <img src={clearIcon} alt='clear filet icon' className='w-full mr-2'/>
                  <h2 className='firago-medium text-xs leading-[14px] opacity-60 dark:text-orange-primary'><FormattedMessage id='clear'/></h2>
                </div>
              </div>
              <hr className="mt-[22px] mb-[40px] border border-solid border-white-400"/>
              <div>
                <Slider
                    min={0}
                    max={5000}
                    range
                    step={10}
                    defaultValue={[0, 5000]}
                    // onChange={onChange}
                    onChangeComplete={onChangeComplete}
                />
                <Checkbox onChange={onSaleChange}>Products for sale</Checkbox>;
              </div>
    </div>
  )
}
