import { createContext, useContext } from "react";

export const StyleContext = createContext({});
export const useComponentStyles = () => useContext(StyleContext);
