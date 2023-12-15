import { AlertsContext } from "../context/AlertsContext";
import { useContext } from "react";

export const useAlertsContext = () => {
    const context = useContext(AlertsContext)
    if(!context){
        throw Error('useAlertsContext must be used inside AlertsContextProvider (yung wrapped in it, i.e. App)')
    }
    return context
}


//basically this is the importable para ma access yung shared data