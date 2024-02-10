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

type ProvidersProps = {};

export function Providers({ children }: PropsWithChildren<ProvidersProps>) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GlobalProvider>
          <ProductsProvider>
            <ProductFiltersProvider>
              <CartProvider>
                <WishlistProvider>
                  <LocaleProvider>
                    <ThemeProvider>
                      {children}
                    </ThemeProvider>
                  </LocaleProvider>
                </WishlistProvider>
              </CartProvider>
            </ProductFiltersProvider>
          </ProductsProvider>
        </GlobalProvider>
      </AuthProvider> 
    </BrowserRouter>
  );
}
