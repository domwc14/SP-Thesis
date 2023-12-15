import {createContext, useReducer} from 'react'

export const AlertsContext = createContext()

//state is previous state
//action is the object from dispatch function, the one with the type: and payload
export const AlertsReducer = (state,action) => {
    console.log("State Before Update", state);
    switch(action.type) {
        case 'SET_ALERTS':
            const newState = {
                ...state,
                AlertsState: {
                    //...state.overdueSI,
                    alerts: action.payload.alerts,
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

export const AlertsContextProvider = ({children}) => {
    const initialState = {
        AlertsState: {
          alerts: [],
          totalPages: 0,
          currentPage: 1,
        },
      };
    
//similar to useState, [initialstate_var, updatestatevalue_var]
//<WorkoutsContext.Provider value={{...state,dispatch}}>  ...state dito kasi 
//type: string that describes the func
//payload: data we need


    const [state,dispatch] = useReducer(AlertsReducer,initialState)
    // dispatch({type: 'SET_OVERDUESI',payload:[{},{}]})
    return (
        <AlertsContext.Provider value={{state,dispatch}}>  
            {children}
        </AlertsContext.Provider>
    )
}