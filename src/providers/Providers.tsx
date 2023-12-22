import { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";

import { GlobalProvider } from "./GlobalProvider/GlobalProvider";
import { LocaleProvider } from "./LocaleProvider/LocaleProvider";

type ProvidersProps = {};

export function Providers({ children }: PropsWithChildren<ProvidersProps>) {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <LocaleProvider>
          {children}
        </LocaleProvider>
      </GlobalProvider>
    </BrowserRouter>
  );
}
