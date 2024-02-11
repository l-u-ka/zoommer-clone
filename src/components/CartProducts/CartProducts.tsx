import { useCartProvider } from '@src/providers/CartProvider/useCartProvider'
import CartProductItem from './CartProduct/CartProductItem';

export default function CartProducts() {

    const {cartItems} = useCartProvider();
    const cartProducts = cartItems?.map((cartItem) => {
        return <CartProductItem product={cartItem.cartProduct}/>
    })

    return (
        <div className='w-full grid grid-cols-1 gap-[10px] max-h-[180px] overflow-y-auto'>
            {cartProducts}
        </div>
    )
}
