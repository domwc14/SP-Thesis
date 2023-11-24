import {createContext, useReducer} from 'react'

export const OverdueSIContext = createContext()

//state is previous state
//action is the object from dispatch function, the one with the type: and payload
export const OverdueSIReducer = (state,action) => {
    console.log("State Before Update", state);
    switch(action.type) {
        case 'SET_OVERDUESI':
            const newState = {
                ...state,
                overdueSI: {
                    //...state.overdueSI,
                    salesinvoices: action.payload.salesinvoices,
                    totalPages: action.payload.totalPages,
                    currentPage: action.payload.currentPage,
                  },
            };
            console.log("State After Update", newState);
            return newState;

        // case 'SET_OVERDUESI_PAGED':
        //     const newState2 = {
        //         ...state,
        //         overdueSI: {
        //             ...state.overdueSI,
        //             currentPage: action.payload.currentPage,
        //           },
        //     };
        //     console.log("State After Update", newState2);
        //     return newState2;

        default:
            return state
    }
}

export const OverdueSIContextProvider = ({children}) => {
    const initialState = {
        overdueSI: {
          salesinvoices: [],
          totalPages: 0,
          currentPage: 1,
        },
      };
    
//similar to useState, [initialstate_var, updatestatevalue_var]
//<WorkoutsContext.Provider value={{...state,dispatch}}>  ...state dito kasi 
//type: string that describes the func
//payload: data we need

//TO REVIEW: WHY DAFUQ ...state does NOT WORK
//<OverdueSIContext.Provider value={{...state,dispatch}}>

    const [state,dispatch] = useReducer(OverdueSIReducer,initialState)
    // dispatch({type: 'SET_OVERDUESI',payload:[{},{}]})
    return (
        <OverdueSIContext.Provider value={{state,dispatch}}>  
            {children}
        </OverdueSIContext.Provider>
    )
}