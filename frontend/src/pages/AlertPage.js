import { useEffect} from "react";
import { useAlertsContext } from "../hooks/useAlertsContext";
import { useAuthContext } from "../hooks/useAuthContext";

import Box from '@mui/material/Box';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


//components
import AlertsDetails from "../components/AlertsDetails";
import NavDrawer from "../components/NavDrawer";


// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));

const AlertPage = () => {
    const {state,dispatch} = useAlertsContext()
    //state because its not just AlertsState, the state also has, total page and currentpage
    const {user} = useAuthContext()

    console.log("Component Rendering", state);


    useEffect( () => {
        const fetchAlerts = async () => {
            const response = await fetch(`/api/alerts?page=${state.AlertsState.currentPage}`,{
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json() //its the response json from server
            if(response.ok){
                console.log("FROM BACKEND", json)
                if (json.currentPage !== state.AlertsState.currentPage) {     //if the user clicks change page too fast, it bugs out, 2 beses nag didispatch = activating useEffect forever
                    console.log("dispatched from inside")
                    dispatch({type:'SET_ALERTS',payload: json})
                }
                //console.log("Component Rendering at end", state);
                //dispatch fires to workoutsReducer - > returns action - > updates the state sa useReducer
                //yung workouts: null magiging action.payload which is the json here
                //yung Workouts.Context.Provider value catches that. Its the ...state change (eto yung "global" context state)
                //this updates the workouts in  const {workouts,dispatch} = useWorkoutsContext() which is used sa UI
            }
            else {
                console.log("response not ok")
            }
        }
        
        if(user){
            fetchAlerts()
        }
    },[dispatch,user,state.AlertsState.currentPage]); //everytime these dependencies are changed NOT RUN, rerun this function (in this case everytime may dispatch, re-run)
    //IE sending the same dispatch type: 'SET_OVERDUESI' DOES NOT trigger useEffect again.
    
    //YOU ARE HERE
    //YOU ARE HERE
    
    // if (state.AlertsState === null) {          //BUFFER while d pa nag loload
    //     return <div>Loading...</div>;
    // }

    return (    
    //const handlePage
    <Box sx={{display: 'grid', gridTemplateColumns: '210px 1fr', gap:3,}}>

        <div><NavDrawer/></div>

        {/* <div>   //EXPERIMENT ON PDF VIEWER
          <PDFViewer width="1000" height="650" className="temporary1" >
          <Invoice/>
          </PDFViewer>
        </div>
        <PDFDownloadLink document={<Invoice />} fileName="somename.pdf">
        {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download now!'
        }
        </PDFDownloadLink> */}

        <div>
            <h2 className="colored_title"> Alerts</h2>
            
            {state && state.AlertsState && state.AlertsState.alerts && state.AlertsState.alerts.map((alert)=>(
            <AlertsDetails key={alert._id} alert={alert}/>
            ))}
            <Stack spacing={2}>
            <Pagination
                count={state.AlertsState.totalPages}
                page={state.AlertsState.currentPage}
                onChange={(event, page) => {
                    if (page !== state.AlertsState.currentPage) {
                    dispatch({ type: 'SET_ALERTS', payload: { ...state.AlertsState, currentPage: page } });
                    }
                    console.log("STATE AFTER Page 2 dispatch", state)
                }} variant="outlined" shape="rounded" sx={{'& .Mui-selected': {border: '2px solid', },}}/> 
            </Stack>
        </div>
    </Box>
    )
}

export default AlertPage;

//page={page} onChange={handlePage}


