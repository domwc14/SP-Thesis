import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext"; 
import { Box, FormControl, InputAdornment, OutlinedInput } from '@mui/material';

const WorkoutForm = () => {
    const{dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()


    const [title,setTitle] = useState('')
    const [load,setLoad] = useState('')
    const [reps,setReps] = useState('')
    const [error,setError] = useState(null)
    const [emptyFields,setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
         e.preventDefault() //page is not refreshed
         if(!user){
            setError('There is no user. Log in first')
            return
         }
         const workout = {title,load,reps} //catches yung mga values sa form

         const response = await fetch('/api/workouts',{
            method:'POST',
            body: JSON.stringify(workout),
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
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            console.log('New Workout Added', json)
            dispatch({type:'CREATE_WORKOUT',payload: json})
         }
    } 

    return (
        <Box>
        <form className="create" onSubmit={handleSubmit}>
        <h3> Add New Workout</h3>
        <label> Exercize Title</label>
        <FormControl sx={{ width: { xs: '10%', md: 224 } }}>
            <OutlinedInput
            size="small"
            id="header-search"
            startAdornment={
                <InputAdornment position="start" sx={{ mr: -0.5 }}>
                </InputAdornment>
            }
            aria-describedby="header-search-text"
            inputProps={{
                'aria-label': 'weight'
            }}
            placeholder="Search"
            />
        </FormControl>
         <label>Load in kg</label>
        <input 
            type="number" onChange={(e)=> setLoad(e.target.value)}
            value={load}
            //className={emptyFields ? emptyFields.includes('load') ? 'error' : '' : ''}
           className={emptyFields.includes('load') ? 'error': ''}
        />
        <label>Reps:</label>
        <input 
            type="number" onChange={(e)=> setReps(e.target.value)}
            value={reps}
            //className={emptyFields ? emptyFields.includes('reps') ? 'error' : '' : ''}
            className={emptyFields.includes('reps') ? 'error': ''}
        />
        <button>Add Workout</button>
        {error && <div className="error">{error}</div>}
        </form>
        </Box>

    )
}

export default WorkoutForm