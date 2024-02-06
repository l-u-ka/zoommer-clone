import { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./GlobalProvider/GlobalProvider";
import { LocaleProvider } from "./LocaleProvider/LocaleProvider";
import { ThemeProvider } from "./ThemeProvider/ThemeProvider";
import {AuthProvider} from "./AuthProvider/AuthProvider";
import { CartProvider } from "./CartProvider/CartProvider";
import { ProductsProvider } from "./ProductsProvider/ProductsProvider";
import {ProductFiltersProvider} from "./ProductFiltersProvider/ProductFiltersProvider";

type ProvidersProps = {};

export function Providers({ children }: PropsWithChildren<ProvidersProps>) {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <AuthProvider>
          <ProductsProvider>
            <ProductFiltersProvider>
              <CartProvider>
                <LocaleProvider>
                  <ThemeProvider>
                    {children}
                  </ThemeProvider>
                </LocaleProvider>
              </CartProvider>
            </ProductFiltersProvider>
          </ProductsProvider>
        </AuthProvider> 
      </GlobalProvider>
    </BrowserRouter>
  );
}
