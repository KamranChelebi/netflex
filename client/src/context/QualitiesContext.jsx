import { createContext, useContext, useEffect, useState } from "react";
import { getQualities } from "../api/requests";

const QualityContext = createContext();

export const QualityContextProvider = ({ children }) => {
  const [qualities, setQualities] = useState(null);
  useEffect(() => {
    getQualities().then((data) => {
      setQualities(data);
    });
  }, [setQualities]);

  return (
    <QualityContext.Provider value={[qualities, setQualities]}>
      {children}
    </QualityContext.Provider>
  );
};

export const useQualityContext = () => useContext(QualityContext);
