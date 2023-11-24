import { useEffect} from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";


//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import Searchbar from "../components/Searchbar";
import { Box } from '@mui/material';

import NavDrawer from "../components/NavDrawer";


const Home = () => {
    const {workouts,dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()

    useEffect(()=>{
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts',{
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json() //its the response json from server
            if(response.ok){
                dispatch({type:'SET_WORKOUTS',payload: json})
                //dispatch fires to workoutsReducer - > returns action - > updates the state sa useReducer
                //yung workouts: null magiging action.payload which is the json here
                //yung Workouts.Context.Provider value catches that. Its the ...state change (eto yung "global" context state)
                //this updates the workouts in  const {workouts,dispatch} = useWorkoutsContext() which is used sa UI
            }
        }

        if(user){
            fetchWorkouts()
        }
    },[dispatch,user]) //everytime these dependencies are run / changed, rerun this function (in this case everytime may dispatch, re-run)
    
    // TEMP
    //if workout is not null 
    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
        {/* //temp */}
        <div><NavDrawer/></div> {/* //temp */}
        <div className="home">
            <Searchbar/>
            <div className="workouts">
            {workouts && workouts.map((workout)=>(
                <WorkoutDetails key={workout._id} workout={workout}/>

            ))}
            </div>
            <WorkoutForm />
        </div>
        </Box>
    )
}

export default Home;