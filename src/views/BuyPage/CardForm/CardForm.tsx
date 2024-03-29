import { useBuyProduct } from '@src/hooks/useBuyProduct';
// import { useRemoveFromCart } from '@src/hooks/useRemoveFromCart';
// import { useCartProvider } from '@src/providers/CartProvider/useCartProvider';
import FullPriceCard from '@src/components/FullPriceCard/FullPriceCard';
import { Form, Input } from 'antd';
import React, { useEffect, useState } from 'react'
import Cards, { Focused } from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { FormattedMessage, useIntl } from 'react-intl';
import MobilePurchaseCard from '@src/views/BuyPage/MobilePurchaseCard/MobilePurchaseCard';
import { usePurchaseProvider } from '@src/providers/PurchaseProvider/usePurchaseProvider';
import { useThemeProvider } from '@src/providers/ThemeProvider/useThemeProvider';
import goBackIcon from '@src/assets/icons/light/category-left-arr.png'
import goBackIconDark from '@src/assets/icons/dark/category-left-arr.png'

interface CardForm {
    number: string;
    name: string;
    expiry: string;
    cvc: string;
}

interface CardFormProps {
    setOnAddress: (value: React.SetStateAction<boolean>) => void;
    setSuccessModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CardForm({setOnAddress, setSuccessModal}: CardFormProps) {

    const [cardForm] = Form.useForm();
    const {totalPurchaseAmount, totalPurchasePrice, setTotalPurchaseAmount, setTotalPurchasePrice, /*isBuyingFromCart, setIsBuyingFromCart*/} = usePurchaseProvider();
    const {buyProduct, isSuccessful, buyLoading} = useBuyProduct();
    const [cardDetails, setCardDetails] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
    });
    // const {cartItems} = useCartProvider();
    // const {removeFromCart} = useRemoveFromCart();
    const {formatMessage} = useIntl();
    const {lightMode} = useThemeProvider();

    function handleValuesChange(values:CardForm) {
        setCardDetails((prev) => ({ ...prev, ...values, focus: Object.keys(values)[0]}));
    }
    function cardFormFinish() {
        buyProduct(totalPurchasePrice, totalPurchaseAmount);
    }

    // function deleteAllCartProducts() {
    //     for (const cartItem of cartItems) {
    //         removeFromCart(cartItem.id, true)
    //     }
    // }   

    useEffect(()=> {
        if (isSuccessful) {
            setSuccessModal(true);
            setTotalPurchaseAmount(0);
            setTotalPurchasePrice(0);
            localStorage.removeItem('purchasePrice');
            localStorage.removeItem('purchaseAmount');
            localStorage.removeItem('address');
            localStorage.removeItem('city');
            // if(isBuyingFromCart) deleteAllCartProducts();
            // setIsBuyingFromCart(false);
            //localStorage.setItem('isBuyingFromCart', JSON.stringify(false));
        }
    }, [isSuccessful])  // after user successfully submits form, remove purchase and address infro from local storage, as well as clear cart if user was buying from cart
    
    function handleClick() {
        cardForm.submit();
    }

    return (
        <div className='w-full flex custom-container'>
            <div className='w-full'>
                <div className='inline-flex items-center mb-[30px] cursor-pointer' onClick={()=>{setOnAddress(true)}}>
                    <img alt='go back icon' src={lightMode ? goBackIcon : goBackIconDark} className='h-full mr-[20px]' />
                    <h2 className='firago-bold text-base leading-[19px] text-black-08 dark:text-dark-black-8'><FormattedMessage id="go.back"/></h2>
                </div>
                <div className='w-full flex flex-col md:flex-row-reverse justify-between'>
                    <Cards
                        number={cardDetails.number}
                        expiry={cardDetails.expiry}
                        cvc={cardDetails.cvc}
                        name={cardDetails.name}
                        focused={cardDetails.focus as Focused | undefined}
                    />
                    <Form<CardForm>
                        form={cardForm}
                        name="card_form"
                        onFinish={cardFormFinish}
                        // style={{ width: '50%'}}
                        className=' w-full md:w-[50%] md:mr-5 mt-10 md:mt-0'
                        onValuesChange={handleValuesChange}
                    >
                        <Form.Item
                            name="number"
                            className='custom-input'
                            rules={[
                                {required: true, message: <FormattedMessage id='please.enter.cardnumber'/>},
                                {len: 19, message: <FormattedMessage id='card.number.full'/>},
                            ]}
                            getValueFromEvent={(e) => {
                                const value = e.target.value.replace(/\D/g, '');
                                let formattedValue = '';
                                for (let i = 0; i < value.length; i++) {
                                    if (i > 0 && i % 4 === 0) {
                                        formattedValue += ' ';
                                    }
                                    formattedValue += value[i];
                                }
                                return formattedValue;
                            }}
                        >
                            <Input type="text" placeholder={formatMessage({id: "card.number"})} maxLength={19}/>
                        </Form.Item>
                        <Form.Item name="name" className='custom-input' rules={[{ required: true, message: <FormattedMessage id='please.enter.fullname'/>}]}>
                            <Input
                                type='text'
                                placeholder={formatMessage({id: "fullname.card"})}
                            />
                        </Form.Item>
                        <div className='flex justify-between'>
                            <Form.Item
                                name="expiry"
                                className='w-[40%] md:w-[45%] custom-input'
                                rules={[
                                    { required: true, message: <FormattedMessage id='please.enter.expiry'/> },
                                    { len: 5, message: <FormattedMessage id='please.enter.full.date'/> },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value) {
                                                return Promise.resolve(); // If value is empty, return resolved promise
                                            }
                            
                                            const [month, year] = value.split('/');
                                            const currentYear = new Date().getFullYear() % 100; // Get last two digits of current year
                                            const enteredMonth = parseInt(month, 10);
                                            let enteredYear = parseInt(year, 10);
                            
                                            // Adjust enteredYear to be in the appropriate century
                                            if (enteredYear < currentYear) {
                                                enteredYear += Math.floor(currentYear / 100) * 100;
                                            } else if (enteredYear >= currentYear + 80) {
                                                enteredYear += Math.floor((currentYear - 100) / 100) * 100;
                                            } else {
                                                enteredYear += Math.floor(currentYear / 100) * 100;
                                            }
                            
                                            // Check if month is between 1 and 12
                                            if (enteredMonth < 1 || enteredMonth > 12) {
                                                return Promise.reject(new Error(formatMessage({id: "valid.month.01-12"})));
                                            }
                            
                                            // Check if year is not in the past and not too far in the future
                                            if (enteredYear < currentYear || enteredYear > currentYear + 20) {
                                                return Promise.reject(new Error(formatMessage({id: "valid.year.24"})));
                                            }
                            
                                            // Return success if all checks pass
                                            return Promise.resolve();
                                        },
                                    }),
                                ]}
                                getValueFromEvent={(e) => {
                                    // Remove non-numeric characters from input
                                    const value = e.target.value.replace(/\D/g, '');
                                    if (value.length > 2) {
                                        return `${value.slice(0, 2)}/${value.slice(2, 4)}`;
                                    } else {
                                        return value;
                                    }
                                }}
                            >
                                <Input
                                    type='text'
                                    placeholder={formatMessage({id: "expiry"})}
                                    maxLength={5} // Maximum length including the '/'
                                />
                            </Form.Item>
                            <Form.Item 
                                name="cvc"
                                className='w-[40%] md:w-[45%] custom-input'
                                rules={[
                                    { required: true, message: <FormattedMessage id='please.enter.cvc'/>},
                                    { min: 3, max: 4, message: <FormattedMessage id='cvc.34.digits'/>},
                                ]}
                                getValueFromEvent={(e) => {
                                    const value = e.target.value.replace(/\D/g, '');
                                    return value;
                                }}
                                >
                                <Input type='text' placeholder="CVC" maxLength={4}/>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>
            <div className='hidden lg:block min-w-[400px] ml-[50px]'>
                <FullPriceCard fullPrice={totalPurchasePrice} onClick={handleClick} loading={buyLoading} buttonText='pay'/>
            </div>
            <div className='block lg:hidden w-full absolute left-0 top-[550px] md:top-[350px]'>
                <MobilePurchaseCard fullPrice={totalPurchasePrice} onClick={handleClick} loading={buyLoading} buttonText='pay'/>
            </div>
        </div>
    )
}
