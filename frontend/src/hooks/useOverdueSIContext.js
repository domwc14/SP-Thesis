import { OverdueSIContext } from "../context/OverdueSIContext";
import { useContext } from "react";

export const useOverdueSIContext = () => {
    const context = useContext(OverdueSIContext)
    if(!context){
        throw Error('useOverdueSIContext must be used inside the OverdueSIContextProvider (yung wrapped in it, i.e. App)')
    }
    return context
}
//this hook returns the value of OverdueSIContext
//the value of OverdueSIContext is the value passed sa
//OverdueSIContext.Provider value={{state,dispatch}}
