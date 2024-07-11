import { createContext, useContext, useEffect, useState } from "react";
import { getInformations } from "../api/informationRequests";

const InformationContext = createContext();

export const InformationContextProvider = ({ children }) => {
  const [information, setInformation] = useState(null);
  useEffect(() => {
    getInformations().then((data) => {
      setInformation(data);
    });
  }, [setInformation]);

  return (
    <InformationContext.Provider value={[information, setInformation]}>
      {children}
    </InformationContext.Provider>
  );
};

export const useInformationContext = () => useContext(InformationContext);
