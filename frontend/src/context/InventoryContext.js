import {createContext, useReducer} from 'react'

export const InventoryContext = createContext()

//state is previous state
//action is the object from dispatch function, the one with the type: and payload
export const InventoryReducer = (state,action) => {
    console.log("INV: State Before Update", state);
    switch(action.type) {
        case 'SET_INVENTORY':

            //const newState = {
                //...state,
                ///inventory_list: action.payload
                // ...state,
                // overdueSI: {
                //     //...state.overdueSI,
                //     salesinvoices: action.payload.salesinvoices,
                //     totalPages: action.payload.totalPages,
                //     currentPage: action.payload.currentPage,
                //   },
            //};
            //console.log("INV: State After Update", newState);
            console.log(action.payload)
            return {inventory_list: action.payload}

        case 'CREATE_PRODUCT':
            return{
                //action.payload is a single new workout
                //... state- > current state
                //state.workouts array of current existing workouts
                inventory_list:[action.payload,...state.inventory_list]
            }
        
        case 'UPDATE_PRODUCT':
            //update the item, 
            return{
                //if object returned is all the products
                //inventory_list: action.payload

                //if object returned is the 1 new document
                inventory_list: [action.payload, ...state.inventory_list.filter((p)=>p._id !== action.payload._id)]

                // inventory_list: [action.payload,...state.inventory_list]
            }
        
    
        case 'DELETE_PRODUCT':
            return {
                //inventory_list: action.payload
                inventory_list: state.inventory_list.filter((p)=>p._id !== action.payload._id)

            }

        case 'GET_ALL_MONTHLY_TOTAL':
            return {
                //inventory_list: action.payload
                inventory_list: state.inventory_list.filter((p)=>p._id !== action.payload._id)

            }
    

        default:
            return state
    }
}

export const InventoryContextProvider = ({children}) => {
    //state IF we are passing MORE THAN 2 VARIABLES
    // const initialState = {
    //     overdueSI: {
    //       salesinvoices: [],
    //       totalPages: 0,
    //       currentPage: 1,
    //     },
    //   };
    const initialState = {inventory_list: null}


//similar to useState, [initialstate_var, updatestatevalue_var]
//<WorkoutsContext.Provider value={{...state,dispatch}}>  ...state dito kasi 
//type: string that describes the func
//payload: data we need

//TO REVIEW: WHY ...state does NOT WORK
//<OverdueSIContext.Provider value={{...state,dispatch}}>

    const [state,dispatch] = useReducer(InventoryReducer,initialState)
    // dispatch({type: 'SET_OVERDUESI',payload:[{},{}]})
    return (
        <InventoryContext.Provider value={{...state,dispatch}}>  
            {children}
        </InventoryContext.Provider>
    )
}