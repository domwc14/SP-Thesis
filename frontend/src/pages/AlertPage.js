// import { useEffect} from "react";
// import { useAlertsContext } from "../hooks/useAlertsContext";
// import { useAuthContext } from "../hooks/useAuthContext";

// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';

// //YOU ARE HERE
// //YOU ARE HERE

// //components
// import OverdueSalesInvoiceDetails from "../components/OverdueSalesInvoiceDetails";
// import NavDrawer from "../components/NavDrawer";
// import { Button } from "@mui/material";

// //temporary

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));

// const AlertPage = () => {
//     const {state,dispatch} = useAlertsContext()
//     //state because its not just overdueSI, the state also has, total page and currentpage
//     const {user} = useAuthContext()

//     console.log("Component Rendering", state);

//     useEffect( () => {
//         const fetchOverdueSI = async () => {
//             const response = await fetch(`/email?page=${state.overdueSI.currentPage}`,{
//                 headers: {
//                     'Authorization': `Bearer ${user.token}`
//                 }
//             })
//             const json = await response.json() //its the response json from server
//             if(response.ok){
//                 console.log("FROM BACKEND", json)
//                 if (json.currentPage !== state.overdueSI.currentPage) {     //if the user clicks change page too fast, it bugs out, 2 beses nag didispatch = activating useEffect forever
//                     console.log("dispatched from inside")
//                     dispatch({type:'SET_OVERDUESI',payload: json})
//                 }
//                 //console.log("Component Rendering at end", state);
//                 //dispatch fires to workoutsReducer - > returns action - > updates the state sa useReducer
//                 //yung workouts: null magiging action.payload which is the json here
//                 //yung Workouts.Context.Provider value catches that. Its the ...state change (eto yung "global" context state)
//                 //this updates the workouts in  const {workouts,dispatch} = useWorkoutsContext() which is used sa UI
//             }
//             else {
//                 console.log("response not ok")
//             }
//         }
        
//         if(user){
//             fetchOverdueSI()
//         }
//     },[dispatch,user,state.overdueSI.currentPage]); //everytime these dependencies are changed NOT RUN, rerun this function (in this case everytime may dispatch, re-run)
//     //IE sending the same dispatch type: 'SET_OVERDUESI' DOES NOT trigger useEffect again.
    
//     return (    
//     //const handlePage
//     <Box sx={{display: 'grid', gridTemplateColumns: '210px 3fr', gap:0}}>
//         <div><NavDrawer/></div>

//         {/* <div>   //EXPERIMENT ON PDF VIEWER
//           <PDFViewer width="1000" height="650" className="temporary1" >
//           <Invoice/>
//           </PDFViewer>
//         </div>
//         <PDFDownloadLink document={<Invoice />} fileName="somename.pdf">
//         {({ blob, url, loading, error }) =>
//             loading ? 'Loading document...' : 'Download now!'
//         }
//         </PDFDownloadLink> */}

//         <div>
//             <h2>OVERDUE SALES INVOICES HERE</h2>
//             {state && state.overdueSI && state.overdueSI.salesinvoices && state.overdueSI.salesinvoices.map((salesinvoice)=>(
//             <OverdueSalesInvoiceDetails key={salesinvoice._id} overdueSI={salesinvoice}/>
//             ))}
//             <Stack spacing={2}>
//             <Pagination
//                 count={state.overdueSI.totalPages}
//                 page={state.overdueSI.currentPage}
//                 onChange={(event, page) => {
//                     if (page !== state.overdueSI.currentPage) {
//                     dispatch({ type: 'SET_OVERDUESI', payload: { ...state.overdueSI, currentPage: page } });
//                     }
//                     console.log("STATE AFTER Page 2 dispatch", state)
//                 }} variant="outlined" shape="rounded" sx={{'& .Mui-selected': {border: '2px solid', },}}/> 
//             </Stack>
//         </div>
//     </Box>
//     )
// }

// export default AlertPage;

// //page={page} onChange={handlePage}









import { useEffect} from "react";
import { useOverdueSIContext } from "../hooks/useOverdueSIContext";
import { useAuthContext } from "../hooks/useAuthContext";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

//components
import OverdueSalesInvoiceDetails from "../components/OverdueSalesInvoiceDetails";
import NavDrawer from "../components/NavDrawer";
import { Button } from "@mui/material";

//temporary

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const EmailPage = () => {
    const {state,dispatch} = useOverdueSIContext()
    //state because its not just overdueSI, the state also has, total page and currentpage
    const {user} = useAuthContext()

    console.log("Component Rendering", state);

    useEffect( () => {
        const fetchOverdueSI = async () => {
            const response = await fetch(`/email?page=${state.overdueSI.currentPage}`,{
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json() //its the response json from server
            if(response.ok){
                console.log("FROM BACKEND", json)
                if (json.currentPage !== state.overdueSI.currentPage) {     //if the user clicks change page too fast, it bugs out, 2 beses nag didispatch = activating useEffect forever
                    console.log("dispatched from inside")
                    dispatch({type:'SET_OVERDUESI',payload: json})
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
            fetchOverdueSI()
        }
    },[dispatch,user,state.overdueSI.currentPage]); //everytime these dependencies are changed NOT RUN, rerun this function (in this case everytime may dispatch, re-run)
    //IE sending the same dispatch type: 'SET_OVERDUESI' DOES NOT trigger useEffect again.
    
    return (    
    //const handlePage
    <Box sx={{display: 'grid', gridTemplateColumns: '210px 2fr 1fr', gap:3}}>
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
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Item>xs=8</Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>xs=4</Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>xs=4</Item>
                </Grid>
                <Grid item xs={8}>
                    <Item>xs=8</Item>
                </Grid>
            </Grid>
        </div>
        <div>
            <h2>OVERDUE SALES INVOICES HERE</h2>
            {state && state.overdueSI && state.overdueSI.salesinvoices && state.overdueSI.salesinvoices.map((salesinvoice)=>(
            <OverdueSalesInvoiceDetails key={salesinvoice._id} overdueSI={salesinvoice}/>
            ))}
            <Stack spacing={2}>
            <Pagination
                count={state.overdueSI.totalPages}
                page={state.overdueSI.currentPage}
                onChange={(event, page) => {
                    if (page !== state.overdueSI.currentPage) {
                    dispatch({ type: 'SET_OVERDUESI', payload: { ...state.overdueSI, currentPage: page } });
                    }
                    console.log("STATE AFTER Page 2 dispatch", state)
                }} variant="outlined" shape="rounded" sx={{'& .Mui-selected': {border: '2px solid', },}}/> 
            </Stack>
        </div>
    </Box>
    )
}

export default EmailPage;

//page={page} onChange={handlePage}