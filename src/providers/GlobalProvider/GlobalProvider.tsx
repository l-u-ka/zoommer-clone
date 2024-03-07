import { PropsWithChildren, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import { useLocation } from "react-router-dom";

export function GlobalProvider({ children }: PropsWithChildren) {

  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const location = useLocation()
  

  const [previousLocation, setPreviousLocation] = useState<any>('/');
  console.log("PREVIOUS LOCATION: ", getPrevLocation())
  console.log("LOCATION: ", location)

  function getPrevLocation() {
    return previousLocation;
  }


  useEffect(() => {
    // Update the previous location whenever the location changes
    setPreviousLocation(location);
  }, [location]);

  return (
    <GlobalContext.Provider value={{showOverlay, setShowOverlay, loginModalOpen, setLoginModalOpen}}>
      {children}
    </GlobalContext.Provider>
  );
}
