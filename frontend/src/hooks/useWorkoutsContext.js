import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext)
    if(!context){
        throw Error('useWorkoutsContext must be used inside the WorkoutsContextProvider (yung wrapped in it, i.e. App)')
    }
    return context
}
//this hook returns the value of WorkoutsContext
//the value of WorkoutsContext is the value passed sa
//WorkoutsContext.Provider value={{state,dispatch}}
