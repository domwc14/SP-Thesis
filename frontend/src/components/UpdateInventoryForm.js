import { useState } from "react"
import { useInventoryContext } from "../hooks/useInventoryContext";
import { useAuthContext } from "../hooks/useAuthContext"; 
import Box from '@mui/material/Box';


const UpdateInventoryForm = () => {
    const{dispatch} = useInventoryContext()
    const {user} = useAuthContext()

    const [product_code,setProduct_code] = useState('')
    const [stock,setStock] = useState('')
    const [type,setType] = useState('')
    const [size,setSize] = useState('')
    const [color,setColor] = useState('')
    const [description,setDescription] = useState('')
    const [acquisition_price,setAcquisition_price] = useState('')
    const [unit_price,setUnit_price] = useState('')
    const [unit,setUnit] = useState('')
    const [stocktrigger_at,setStocktrigger_at] = useState('')
    const [emptyFields,setEmptyFields] = useState([])
    const [error,setError] = useState(null)



    const handleSubmit = async (e) => {
         e.preventDefault() //page is not refreshed
         if(!user){
            setError('There is no user. Log in first')
            return
         }

         //... 
         const product = {
            ...(product_code && { product_code }),
            ...(stock && { stock }),
            ...(type && { type }),
            ...(size && { size }),
            ...(color && { color }),
            ...(description && { description }),
            ...(acquisition_price && { acquisition_price }),
            ...(unit_price && { unit_price }),
            ...(unit && { unit }),
            ...(stocktrigger_at && { stocktrigger_at }),
         };

         //if product_code is empty, it still fetches as
         //     /product/ 
         //but since there is not route like that in express, it fetches nothing.
         const response = await fetch('/api/product/'+product_code,{
            method:'PATCH',
            body: JSON.stringify(product),
            headers:{
                'Content-Type': 'application/json',
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
            setStock('')
            setType('')
            setSize('')
            setColor('')
            setDescription('')
            setAcquisition_price('')
            setUnit_price('')
            setUnit('')
            setStocktrigger_at('')
            setError(null)
            setEmptyFields([])
            console.log('Product Updated', json)
            dispatch({type:'UPDATE_PRODUCT',payload: json})
            // if (onSubmit) {
            //    onSubmit();
            // }
         }

    } 


    return (
        <Box>
        <form id="UpdateInventoryForm" className="create" onSubmit={handleSubmit}>
        <h3> Update Product </h3>
        <label> Product Code / Name</label>
        <input 
            type="text" onChange={(e)=> setProduct_code(e.target.value)}
            value={product_code}
            className={emptyFields.includes('product_code') ? 'error': ''}
        />

        {error && <div className="error">{error}</div>}
        
         <label>Stock</label>
        <input 
            type="number" onChange={(e)=> setStock(e.target.value)}
            value={stock}

        />
        <label> Type </label>
        <input 
            type="text" onChange={(e)=> setType(e.target.value)}
            value={type}
          
        />
         <label>Size</label>
        <input 
            type="text" onChange={(e)=> setSize(e.target.value)}
            value={size}
         

        />
        <label>Color</label>
        <input 
            type="text" onChange={(e)=> setColor(e.target.value)}
            value={color}

        />
        <label>Description</label>
        <input 
            type="text" onChange={(e)=> setDescription(e.target.value)}
            value={description}

        />
        <label>Acquisition Price</label>
        <input 
            type="number" onChange={(e)=> setAcquisition_price(e.target.value)}
            value={acquisition_price}
           
        />
        <label>Unit Price</label>
        <input 
            type="number" onChange={(e)=> setUnit_price(e.target.value)}
            value={unit_price}

        />
        <label>Unit</label>
        <input 
            type="text" onChange={(e)=> setUnit(e.target.value)}
            value={unit}

        />
        <label>Alert me when the stock dips at or below: *optional</label>
        <input 
            type="text" onChange={(e)=> setStocktrigger_at(e.target.value)}
            value={stocktrigger_at}
        />
        
        {/* <button type="submit" style={{ position: 'fixed', bottom: '40px', right: '600px', }}>Add Workout</button> */}
        </form>
        </Box>

    )
}

export default UpdateInventoryForm