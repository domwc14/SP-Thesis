import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if(!context){
        throw Error('useAuthContext must be used inside the WorkoutsContextProvider (yung wrapped in it, i.e. App)')
    }
    return context
}
//this hook returns the value of AuthContext
//the value of AuthContext is the value passed sa
//AuthContext.Provider value={{state,dispatch}}
