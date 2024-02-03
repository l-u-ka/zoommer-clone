import { ProductType } from "@src/@types/types";
import AdditionalDetail from "./AdditionalDetail/AdditionalDetail";
import { FormattedMessage } from "react-intl";

export default function ProductDetails({product} : {product: ProductType}) {
    // console.log("PRODUCT DETAILS: ", product)
   
    return (
        <div>
            <div>
                <div className=" max-w-[400px]">
                    <h3 className="firago-bold text-sm leading-[17px] mb-5">{product?.title.charAt(0).toUpperCase() + product?.title.substring(1, product?.title.length)}</h3>
                    <img src={product?.image} alt="product image" className="w-full h-[250px] object-contain"/>
                </div>
            </div>
            <hr className="mt-[24px] mb-[30px] border border-solid border-white-400"/>
            <div>
                <h3 className="firago-semibold text-lg leading-5 mb-[30px]"><FormattedMessage id="additional.info"/></h3>
                <AdditionalDetail paragraph={<FormattedMessage id="description"/>} text={product?.description}/>
            </div>
        </div>
    )
}
