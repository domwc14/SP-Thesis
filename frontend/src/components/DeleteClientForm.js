import { useState } from "react"
import { useClientsContext } from "../hooks/useClientsContext";
import { useAuthContext } from "../hooks/useAuthContext"; 
import Box from '@mui/material/Box';

const DeleteClientForm = () => {
    const{dispatch} = useClientsContext()
    const {user} = useAuthContext()

    const [name,setName] = useState('')
    const [emptyFields,setEmptyFields] = useState([])
    const [error,setError] = useState(null)



    const handleSubmit = async (e) => {
         e.preventDefault() //page is not refreshed
         if(!user){
            setError('There is no user. Log in first')
            return
         }

         const response = await fetch('/customers/'+name,{
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
            setName('')
            setError(null)
            setEmptyFields([])
            console.log('Client deleted', json)
            dispatch({type:'DELETE_CLIENT',payload: json})
         }

    } 


    return (
        <Box>
        <form id="DeleteClientForm" className="create" onSubmit={handleSubmit}>
        <h3> Delete Client </h3>
        <label> Client Name</label>
        <input 
            type="text" onChange={(e)=> setName(e.target.value)}
            value={name}
            className={emptyFields.includes('name') ? 'error': ''}
        />

        {error && <div className="error">{error}</div>}
                
        </form>
        </Box>

    )
}

export default DeleteClientForm