import {createContext, useReducer} from 'react'

export const SalesInvoiceContext = createContext()

//state is previous state
//action is the object from dispatch function, the one with the type: and payload
export const SalesInvoiceReducer = (state,action) => {
    console.log("SI: State Before Update", state);
    switch(action.type) {
        case 'SET_SALES_INVOICE':

            //const newState = {
                //...state,
                ///sales_invoice_list: action.payload
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
            return {sales_invoice_list: action.payload}

        case 'CREATE_SALES_INVOICE':
            console.log("create invoice JSON sent to reducer",action.payload)
            return{
                //action.payload is a single new workout
                //... state- > current state
                //state.workouts array of current existing workouts
                sales_invoice_list:[action.payload,...state.sales_invoice_list]
            }
        
        case 'UPDATE_SALES_INVOICE':
            //update the item, 
            return{
                //the object returned is all the products
                sales_invoice_list: action.payload

                // sales_invoice_list: [action.payload,...state.sales_invoice_list]
            }
        
    
        case 'DELETE_SALES_INVOICE':
            return {
                sales_invoice_list: action.payload
                
            }
        
        // case 'GET_SALES_INVOICE':   //unused
        // return{
        //     //action.payload is a single new workout
        //     //... state- > current state
        //     //state.workouts array of current existing workouts
        //     sales_invoice_list: action.payload
        // }

        default:
            return state
    }
}

export const SalesInvoiceContextProvider = ({children}) => {
    //state IF we are passing MORE THAN 2 VARIABLES
    // const initialState = {
    //     overdueSI: {
    //       salesinvoices: [],
    //       totalPages: 0,
    //       currentPage: 1,
    //     },
    //   };
    const initialState = {sales_invoice_list: null}


//similar to useState, [initialstate_var, updatestatevalue_var]
//<WorkoutsContext.Provider value={{...state,dispatch}}>  ...state dito kasi 
//type: string that describes the func
//payload: data we need

    //TO REVIEW: WHY ...state does NOT WORK
//<OverdueSIContext.Provider value={{...state,dispatch}}>

    const [state,dispatch] = useReducer(SalesInvoiceReducer,initialState)
    // dispatch({type: 'SET_OVERDUESI',payload:[{},{}]})
    return (
        <SalesInvoiceContext.Provider value={{...state,dispatch}}>  
            {children}
        </SalesInvoiceContext.Provider>
    )
}