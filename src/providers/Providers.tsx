import { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";

import { GlobalProvider } from "./GlobalProvider/GlobalProvider";
import { LocaleProvider } from "./LocaleProvider/LocaleProvider";
import { ThemeProvider } from "./ThemeProvider/ThemeProvider";

type ProvidersProps = {};

export function Providers({ children }: PropsWithChildren<ProvidersProps>) {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <LocaleProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </LocaleProvider>
      </GlobalProvider>
    </BrowserRouter>
  );
}
