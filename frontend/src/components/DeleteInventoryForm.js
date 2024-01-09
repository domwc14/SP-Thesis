import { useState } from "react"
import { useInventoryContext } from "../hooks/useInventoryContext";
import { useAuthContext } from "../hooks/useAuthContext"; 
import Box from '@mui/material/Box';

const DeleteInventoryForm = () => {
    const{dispatch} = useInventoryContext()
    const {user} = useAuthContext()

    const [product_code,setProduct_code] = useState('')
    const [emptyFields,setEmptyFields] = useState([])
    const [error,setError] = useState(null)



    const handleSubmit = async (e) => {
         e.preventDefault() //page is not refreshed
         if(!user){
            setError('There is no user. Log in first')
            return
         }

         const response = await fetch(`/api/product/${encodeURIComponent(product_code)}`,{
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
            //resets the form back to empty strings
            setProduct_code('')
            // setStock('')
            // setType('')
            // setSize('')
            // setColor('')
            // setDescription('')
            // setAcquisition_price('')
            // setUnit_price('')
            // setUnit('')
            // setStocktrigger_at('')
            setError(null)
            setEmptyFields([])
            console.log('Product deleted', json)
            dispatch({type:'DELETE_PRODUCT',payload: json})
         }

    } 


    return (
        <Box>
        <form id="DeleteInventoryForm" className="create" onSubmit={handleSubmit}>
        <h3> Delete Product </h3>
        <label> Product Code / Name</label>
        <input 
            type="text" onChange={(e)=> setProduct_code(e.target.value)}
            value={product_code}
            className={emptyFields.includes('product_code') ? 'error': ''}
        />

        {error && <div className="error">{error}</div>}
                
        </form>
        </Box>

    )
}

export default DeleteInventoryForm