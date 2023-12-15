import { ClientsContext } from "../context/ClientsContext";
import { useContext } from "react";

export const useClientsContext = () => {
    const context = useContext(ClientsContext)
    if(!context){
        throw Error('useClientsContext must be used inside the ClientsContextProvider (yung wrapped in it, i.e. App)')
    }
    return context
}


//basically this is the importable para ma access yung shared data
