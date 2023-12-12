//YOU ARE HERE , TRY TO IMPORT DRandSalesInvoicePDF.js
import { useState } from "react"
import { useSalesInvoiceContext } from "../hooks/useSalesInvoiceContext";
import { useAuthContext } from "../hooks/useAuthContext"; 
import Box from '@mui/material/Box';
import modifyPdf from "./DRandSalesInvoicePDF";


const GeneratePDFForm = () => {
    const{dispatch} = useSalesInvoiceContext()
    const {user} = useAuthContext()

    const [invoice_number,setInvoice_number] = useState('')
    const [emptyFields,setEmptyFields] = useState([])
    const [error,setError] = useState(null)



    const handleSubmit = async (e) => {
        console.log("generated")
         e.preventDefault() //page is not refreshed
         if(!user){
            setError('There is no user. Log in first')
            return
         }
        
        if(invoice_number.length === 0){
            setError("Input the invoice number to be printed.")
            setEmptyFields(['invoice_number'])
            return
        }

         const response = await fetch('/salesinvoice/'+invoice_number,{

            headers:{
                'Authorization': `Bearer ${user.token}`
            }
         })
         //remember if success, we sendback the object, else send error
         const json = await response.json() //this json is the response from the backend.
         if (!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
         }
         if(response.ok){
            setInvoice_number('')
            setError(null)
            setEmptyFields([])
            console.log('Invoice generated', json)
            
            modifyPdf(json)
            //dispatch({type:'GET_SALES_INVOICE',payload: json})
         }

    } 


    return (
        <Box>
        <form id="GeneratePDFForm" className="create" onSubmit={handleSubmit}>
        <h3> Generate PDF of Sales Invoice </h3>
        <label> Invoice Number</label>
        <input 
            type="text" onChange={(e)=> setInvoice_number(e.target.value)}
            value={invoice_number}
            className={emptyFields.includes('invoice_number') ? 'error': ''}
        />

        {error && <div className="error">{error}</div>}
                
        </form>
        </Box>

    )
}

export default GeneratePDFForm