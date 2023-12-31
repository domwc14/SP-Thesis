import { useState } from "react"
import { useSalesInvoiceContext } from "../hooks/useSalesInvoiceContext";
import { useAuthContext } from "../hooks/useAuthContext"; 
import Box from '@mui/material/Box';


const DeleteSalesInvoiceForm = () => {
    const{dispatch} = useSalesInvoiceContext()
    const {user} = useAuthContext()

    const [invoice_number,setInvoice_number] = useState('')
    const [emptyFields,setEmptyFields] = useState([])
    const [error,setError] = useState(null)



    const handleSubmit = async (e) => {
         e.preventDefault() //page is not refreshed
         if(!user){
            setError('There is no user. Log in first')
            return
         }

         const response = await fetch('/api/salesinvoice/'+invoice_number,{
            method:'DELETE',
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
            console.log('Invoice deleted', json)
            dispatch({type:'DELETE_SALES_INVOICE',payload: json})
         }

    } 


    return (
        <Box>
        <form id="DeleteSalesInvoiceForm" className="create" onSubmit={handleSubmit}>
        <h3> Delete Sales Invoice </h3>
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

export default DeleteSalesInvoiceForm