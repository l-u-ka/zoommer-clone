import { CartProduct } from '@src/@types/types'
import React, { useState } from 'react'
import binIcon from '@src/assets/icons/bin.png'
import { useCartProvider } from '@src/providers/CartProvider/useCartProvider';
import { useRemoveFromCart } from '@src/hooks/useRemoveFromCart';
import { useAddToCart } from '@src/hooks/useAddToCart';

export default function CartProductItem({product}: {product: CartProduct}) {
    // const [productCount, setProductCount] = useState<number>(1);
    const {cartItems} = useCartProvider();
    const {removeFromCart, removeFromCartLoading} = useRemoveFromCart();
    const {addToCart} = useAddToCart();

    function removeProduct(productId: string, removeAll: boolean) {
        const result = cartItems.find(item => item.cartProduct.id === productId);
        console.log(result);
        if(result) removeFromCart(result.id, removeAll)
    }

    function getCartItemCount(productId: string) {
        const result = cartItems.find(item => item.cartProduct.id === productId);
        return result?.count
    }

    return (
        <div className='flex bg-white-400 dark:bg-dark-white-400 rounded-xl p-[10px] relative'>
            <img className=' w-[60px] h-[60px] object-contain' alt='product img' src={product.image}/>
            <div className='max-w-[120px] flex flex-col justify-between ml-3 mr-auto'>
                <h3 className='firago-medium text-black-08 dark:text-dark-black-8 text-base leading-[14px]'>{product.title}</h3>
                <h4 className='firago-bold text-black-main dark:text-dark-black-main text-sm leading-[17px]'>{product.salePrice || product.price} ₾</h4>
            </div>
            <div className='flex flex-col justify-between h-full'>
                <div onClick={()=>removeProduct(product.id, true)} className='absolute top-1 w-[30px] h-[30px] rounded-[50%] hover:bg-gray-shadow transition-all duration-300 ease-out self-end flex justify-center items-center cursor-pointer'>
                    {!removeFromCartLoading && <img src={binIcon} alt='remove from cart icon' className='w-4'/>}
                    {removeFromCartLoading && <div>Loading...</div>}
                </div>
                <div className='inline-flex bg-orange-main w-[90px] h-[30px] rounded-[30px] mt-auto'>
                    <div onClick={()=>removeProduct(product.id, false)/*setProductCount(prev => prev - 1)*/} className='w-[30px] h-full rounded-[30px] cursor-pointer flex justify-center items-center text-white hover:bg-gray-shadow transition-all duration-300 ease-out'>
                        <p className='firago-bold text-xs leading-[15px]'>-</p>
                    </div>
                    <div className='flex-1 flex justify-center items-center text-white'>
                        <p className='firago-bold text-xs leading-[15px]'>{getCartItemCount(product.id)}</p>
                    </div>
                    <div onClick={()=>{addToCart(product.id)}/*setProductCount(prev => prev + 1)*/} className='w-[30px] h-full rounded-[30px] cursor-pointer flex justify-center items-center text-white hover:bg-gray-shadow transition-all duration-300 ease-out'>
                    <p className='firago-bold text-xs leading-[15px]'>+</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
