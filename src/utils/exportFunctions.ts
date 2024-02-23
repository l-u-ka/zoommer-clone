import { CartITem } from "@src/@types/types";

export function getFullPrice(cartItems: CartITem[]) {
    let fullPrice:number = 0;
    for (let item of cartItems) {
        for (let i=0; i<item.count; i++) {
            fullPrice += item.cartProduct.salePrice || item.cartProduct.price;
        }
    }
    return fullPrice;
}