import { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";

import { GlobalProvider } from "./GlobalProvider/GlobalProvider";

type ProvidersProps = {};

export function Providers({ children }: PropsWithChildren<ProvidersProps>) {
  return (
    <BrowserRouter>
      <GlobalProvider>{children}</GlobalProvider>
    </BrowserRouter>
  );
}
