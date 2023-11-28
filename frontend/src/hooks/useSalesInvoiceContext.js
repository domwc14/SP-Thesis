import { SalesInvoiceContext } from "../context/SalesInvoiceContext";
import { useContext } from "react";

export const useSalesInvoiceContext = () => {
    const context = useContext(SalesInvoiceContext)
    if(!context){
        throw Error('useSalesInvoiceContext must be used inside the SalesInvoiceContextProvider (yung wrapped in it, i.e. App)')
    }
    return context
}


//basically this is the importable para ma access yung shared data
