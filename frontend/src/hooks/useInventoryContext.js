import { InventoryContext } from "../context/InventoryContext";
import { useContext } from "react";

export const useInventoryContext = () => {
    const context = useContext(InventoryContext)
    if(!context){
        throw Error('useInventoryContext must be used inside the InventoryContextProvider (yung wrapped in it, i.e. App)')
    }
    return context
}


//basically this is the importable para ma access yung shared data
