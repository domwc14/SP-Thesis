import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from "./useWorkoutsContext"
export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const {dispatch: workoutsDispatch} = useWorkoutsContext()
    const logout = () => {
        localStorage.removeItem('user')
        
        dispatch({type: 'LOGOUT'})
        workoutsDispatch({type:'SET_WORKOUTS', payload:null})
    }

    
    return {logout}
}

//how constitutes a log in user?
//global state of user: true
//json webtoken on localStorage

//