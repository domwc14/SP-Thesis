import { useState } from "react"
import { useClientsContext } from "../hooks/useClientsContext";
import { useAuthContext } from "../hooks/useAuthContext"; 
import Box from '@mui/material/Box';


const AddClientForm = () => {
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
         const client = {name,TIN,customer_type,location,market} //catches yung mga values sa form

         const response = await fetch('/customers/addcustomer',{
            method:'POST',
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
            console.log('New Client Added', json)
            dispatch({type:'CREATE_CLIENT',payload: json})
            // if (onSubmit) {
            //    onSubmit();
            // }
         }

    } 




    return (
        <Box>
        <form id="AddClientForm" className="create" onSubmit={handleSubmit}>
        <h3> Add Client</h3>
        <label> Client Name</label>
        <input 
            type="text" onChange={(e)=> setName(e.target.value)}
            value={name}
          
           className={emptyFields.includes('name') ? 'error': ''}
        />
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
        {error && <div className="error">{error}</div>}
        </form>
        </Box>

    )
}

export default AddClientForm