import { PropsWithChildren, useState } from "react";

import { GlobalContext } from "./GlobalContext";

export function GlobalProvider({ children }: PropsWithChildren) {
  const [count, setCount] = useState(0);

  return (
    <GlobalContext.Provider value={{ count, setCount }}>
      {children}
    </GlobalContext.Provider>
  );
}
