import {createContext, useReducer} from 'react'

export const ClientsContext = createContext()

//state is previous state
//action is the object from dispatch function, the one with the type: and payload
export const ClientsReducer = (state,action) => {
    console.log("Clients: State Before Update", state);
    switch(action.type) {
        case 'SET_CLIENTS':
            console.log(action.payload)
            return {clients_list: action.payload}

        case 'CREATE_CLIENT':
            return{
                //action.payload is a single new workout
                //... state- > current state
                //state.workouts array of current existing workouts
                clients_list:[action.payload,...state.clients_list]
            }
        
        case 'UPDATE_CLIENT':
            //update the item, 
            return{
                //if object returned is all the products
                //clients_list: action.payload

                //if object returned is the 1 new document
                clients_list: [action.payload, ...state.clients_list.filter((p)=>p._id !== action.payload._id)]

                // clients_list: [action.payload,...state.clients_list]
            }
        
    
        case 'DELETE_CLIENT':
            return {
                //clients_list: action.payload
                clients_list: state.clients_list.filter((p)=>p._id !== action.payload._id)

            }

        default:
            return state
    }
}

export const ClientsContextProvider = ({children}) => {
    //state IF we are passing MORE THAN 2 VARIABLES
    // const initialState = {
    //     overdueSI: {
    //       salesinvoices: [],
    //       totalPages: 0,
    //       currentPage: 1,
    //     },
    //   };
    const initialState = {clients_list: null}


//similar to useState, [initialstate_var, updatestatevalue_var]
//<WorkoutsContext.Provider value={{...state,dispatch}}>  ...state dito kasi 
//type: string that describes the func
//payload: data we need

//TO REVIEW: WHY ...state does NOT WORK
//<OverdueSIContext.Provider value={{...state,dispatch}}>

    const [state,dispatch] = useReducer(ClientsReducer,initialState)
    // dispatch({type: 'SET_OVERDUESI',payload:[{},{}]})
    return (
        <ClientsContext.Provider value={{...state,dispatch}}>  
            {children}
        </ClientsContext.Provider>
    )
}