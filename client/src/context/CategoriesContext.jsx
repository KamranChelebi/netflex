import { createContext, useContext, useEffect, useState } from "react";
import { getAllCategories } from "../api/categoryRequests";

const CategoryContext = createContext();

export const CategoryContextProvider = ({ children }) => {
  const [categories, setCategories] = useState(null);
  useEffect(() => {
    getAllCategories().then((data) => {
      setCategories(data);
    });
  }, [setCategories]);

  return (
    <CategoryContext.Provider value={[categories, setCategories]}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => useContext(CategoryContext);
