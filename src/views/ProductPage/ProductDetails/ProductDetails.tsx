import { ProductType } from "@src/@types/types";
import AdditionalDetail from "./AdditionalDetail/AdditionalDetail";
import { FormattedMessage } from "react-intl";
import SimilarProducts from "./SimilarProducts/SimilarProducts";

export default function ProductDetails({product} : {product: ProductType}) {
    // console.log("PRODUCT DETAILS: ", product)
   
    return (
        <div className="w-full">
            <div className="w-full lg:max-w-[450px]">
                <h3 className="firago-bold text-sm leading-[17px] mb-5 dark:text-orange-primary">{product?.title.charAt(0).toUpperCase() + product?.title.substring(1, product?.title.length)}</h3>
                <img src={product?.image} alt="product image" className="w-full h-[300px] object-contain"/>
            </div>
            <hr className="mt-[30px] mb-[30px] border border-solid border-white-400"/>
            <SimilarProducts category={product.category_name} productId={product.id}/>
            <hr className="mt-[30px] mb-[30px] border border-solid border-white-400"/>
            <div>
                <h3 className="firago-semibold text-lg leading-5 mb-[24px]"><FormattedMessage id="additional.info"/></h3>
                <AdditionalDetail paragraph={<FormattedMessage id="description"/>} text={product?.description}/>
            </div>
            <hr className="mt-[30px] border border-solid border-white-400"/>
        </div>
    )
}
