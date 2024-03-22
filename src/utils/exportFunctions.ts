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

export const modifyDate = (created_at: string) => {
    const createdDate:Date = new Date(created_at);
    const formattedDate = createdDate.toISOString().split('T')[0]; // Extracting date part
    const formattedTime = createdDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Formatting time
    return `${formattedDate} ${formattedTime}`;
}