import { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./GlobalProvider/GlobalProvider";
import { LocaleProvider } from "./LocaleProvider/LocaleProvider";
import { ThemeProvider } from "./ThemeProvider/ThemeProvider";
import {AuthProvider} from "./AuthProvider/AuthProvider";
import { CartProvider } from "./CartProvider/CartProvider";
import { ProductsProvider } from "./ProductsProvider/ProductsProvider";
import {ProductFiltersProvider} from "./ProductFiltersProvider/ProductFiltersProvider";
import { WishlistProvider } from "./WishlistProvider/WishlistProvider";
import { PurchaseProvider } from "./PurchaseProvider/PurchaseProvider";
import { OrderHistoryProvider } from "./OrderHistoryProvider/OrderHistoryProvider";
import { HelmetProvider } from 'react-helmet-async';
const helmetContext = {};

export function Providers({ children }: PropsWithChildren) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GlobalProvider>
          <ProductsProvider>
            <ProductFiltersProvider>
              <CartProvider>
                <WishlistProvider>
                  <PurchaseProvider>
                    <OrderHistoryProvider>
                      <LocaleProvider>
                        <ThemeProvider>
                          <HelmetProvider context={helmetContext}>
                            {children}
                          </HelmetProvider>
                        </ThemeProvider>
                      </LocaleProvider>
                    </OrderHistoryProvider>
                  </PurchaseProvider>
                </WishlistProvider>
              </CartProvider>
            </ProductFiltersProvider>
          </ProductsProvider>
        </GlobalProvider>
      </AuthProvider> 
    </BrowserRouter>
  );
}
