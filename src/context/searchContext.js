import { createContext, useState } from "react";

export const SearchContext = createContext({
    searchWord: '',
    setSearchWord: ()=>{},
    category: '',
    setCategory: ()=>{},
    status:'',
    setStatus:()=>{}
});



export const SearchContextProvider = ({ children }) => {
  const [searchWord, setSearchWord] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  
  const value = {searchWord,setSearchWord,category,setCategory,status,setStatus};

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
