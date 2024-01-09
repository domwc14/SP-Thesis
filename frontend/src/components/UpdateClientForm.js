import { useState } from "react"
import { useClientsContext } from "../hooks/useClientsContext";
import { useAuthContext } from "../hooks/useAuthContext"; 
import Box from '@mui/material/Box';


const UpdateClientForm = () => {
    const{dispatch} = useClientsContext()
    const {user} = useAuthContext()

    const [name,setName] = useState('')
    const [TIN,setTIN] = useState('')
    const [customer_type,setCustomertype] = useState('')
    const [location,setLocation] = useState('')
    const [market,setMarket] = useState('')
    const [emptyFields,setEmptyFields] = useState([])
    const [error,setError] = useState(null)



    const handleSubmit = async (e) => {
         e.preventDefault() //page is not refreshed
         if(!user){
            setError('There is no user. Log in first')
            return
         }

         //... 
         const client = {
            ...(name && { name }),
            ...(TIN && { TIN }),
            ...(customer_type && { customer_type }),
            ...(location && { location }),
            ...(market && { market }),
         };

         const response = await fetch('/customers/'+name,{
            method:'PATCH',
            body: JSON.stringify(client),
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
            setName('')
            setTIN('')
            setCustomertype('')
            setLocation('')
            setMarket('')
            setError(null)
            setEmptyFields([])
            console.log('Client Updated', json)
            dispatch({type:'UPDATE_CLIENT',payload: json})
            // if (onSubmit) {
            //    onSubmit();
            // }
         }

    } 


    return (
        <Box>
        <form id="UpdateClientForm" className="create" onSubmit={handleSubmit}>
        <h3> Update Client Details </h3>
        <h5> *Enter Client's name. Fields left blank are not changed or modified.  </h5>
        <label> Client Name</label>
        <input 
            type="text" onChange={(e)=> setName(e.target.value)}
            value={name}
            className={emptyFields.includes('name') ? 'error': ''}
        />

        {error && <div className="error">{error}</div>}
        
        <label>TIN</label>
        <input 
            type="text" onChange={(e)=> setTIN(e.target.value)}
            value={TIN}
          
           className={emptyFields.includes('TIN') ? 'error': ''}
        />
        <label> Type </label>
        <input 
            type="text" onChange={(e)=> setCustomertype(e.target.value)}
            value={customer_type}
          
           className={emptyFields.includes('customer_type') ? 'error': ''}
        />
         <label>Location</label>
        <input 
            type="text" onChange={(e)=> setLocation(e.target.value)}
            value={location}
         
           className={emptyFields.includes('location') ? 'error': ''}
        />
        <label>Market</label>
        <input 
            type="text" onChange={(e)=> setMarket(e.target.value)}
            value={market}
          
           className={emptyFields.includes('market') ? 'error': ''}
        />
        
        {/* <button type="submit" style={{ position: 'fixed', bottom: '40px', right: '600px', }}>Add Workout</button> */}
        </form>
        </Box>

    )
}

export default UpdateClientForm