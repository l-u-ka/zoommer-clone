import { ProductCategory } from "@src/@types/types";
import { useProductsProvider } from "@src/providers/ProductsProvider/useProductsProvider"
import { Helmet } from "react-helmet-async";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

export default function AllCategories() {

    const {categories} = useProductsProvider();
    const categoryElements = categories.map((cat:ProductCategory) => {
        return <Link key={cat.id} to={`/products/${cat.name}`} className="no-underline firago-semibold text-text-blue dark:text-dark-text-blue text-lg hover:text-orange-main transition-all duration-200 ease-in-out delay-0">{cat.name}</Link>
    })

    return (
        <>
            <Helmet>
                <title>All Categories</title>
                <meta name='all categories' content='All Categories Page' />
            </Helmet>
            <div className="custom-container pt-[30px] pb-[60px] min-h-[80vh] w-full">
                <h3 className="firago-medium text-base text-text-blue dark:text-dark-text-blue leading-6"><FormattedMessage id="all.categories"/></h3>
                <hr className="mt-[20px] mb-[30px] border border-solid border-border-white dark:border-border-dark-white"/>
                <div className="grid grid-cols-3 gap-y-7 w-full">{categoryElements}</div>
            </div>
        </>
    )
}
