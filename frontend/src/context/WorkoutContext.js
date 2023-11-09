import {createContext, useReducer} from 'react'

export const WorkoutsContext = createContext()

//state is previous state
//action is the object from dispatch function, the one with the type: and payload
export const workoutsReducer = (state,action) => {
    switch(action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return{
                //action.payload is a single new workout
                //... state- > current state
                //state.workouts array of current existing workouts
                workouts:[action.payload,...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((w)=>w._id !== action.payload._id)
            }

        default:
            return state
    }
}

//provide context in the app tree so that
//components can access it
//<WorkoutsContext.Provider>
//children = the ones wrapped around by the WorkoutsContext.Provider
//children = App sa index.js
export const WorkoutsContextProvider = ({children}) => {
//similar to useState, [initialstate_var, updatestatevalue_var]
//<WorkoutsContext.Provider value={{...state,dispatch}}>  ...state dito kasi 
//type: string that describes the func
//payload: data we need
    const [state,dispatch] = useReducer(workoutsReducer, {workouts:null})
    // dispatch({type: 'SET_WORKOUTS',payload:[{},{}]})
    return (
        <WorkoutsContext.Provider value={{...state,dispatch}}>  
            {children}
        </WorkoutsContext.Provider>
    )
}

//Provider wraps children == app 
//app wraps all other components, thus all components can use this context

//dispatch is so that we can locally show the change in the UI.
//these states are changes to the UI. the changes to the database is already done in backend
//but cannot be shown without refreshing (fetching the data again from backend)