import { CartITem } from "@src/@types/types";

export function getFullPrice(cartItems: CartITem[]) {
    let fullPrice:number = 0;
    for (let item of cartItems) {
        if (item.cartProduct.salePrice) {
            fullPrice += item.cartProduct.salePrice
        } else fullPrice += item.cartProduct.price
    }
    return fullPrice;
}