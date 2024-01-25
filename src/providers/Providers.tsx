import { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./GlobalProvider/GlobalProvider";
import { LocaleProvider } from "./LocaleProvider/LocaleProvider";
import { ThemeProvider } from "./ThemeProvider/ThemeProvider";
import {AuthProvider} from "./AuthProvider/AuthProvider";
import { CartProvider } from "./CartProvider/CartProvider";
import { ProductsProvider } from "./ProductsProvider/ProductsProvider";

type ProvidersProps = {};

export function Providers({ children }: PropsWithChildren<ProvidersProps>) {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <AuthProvider>
          <ProductsProvider>
            <CartProvider>
              <LocaleProvider>
                <ThemeProvider>
                  {children}
                </ThemeProvider>
              </LocaleProvider>
            </CartProvider>
          </ProductsProvider>
        </AuthProvider> 
      </GlobalProvider>
    </BrowserRouter>
  );
}
