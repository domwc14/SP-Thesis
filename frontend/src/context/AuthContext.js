import {createContext, useReducer, useEffect} from 'react'

export const AuthContext = createContext()

//cases: when one log ins and one logs out
export const authReducer = (state,action) => {
    switch(action.type){
        case 'LOGIN':
            return {user: action.payload}
        case 'LOGOUT':
            return{user:null}
        default:
            return state
    }
}

//AuthContextProvider is the function called
//returns the actual wrapping of the app (children) inside the
//AuthContext.Provider
export const AuthContextProvider = ({children}) => {
    //register state
    const [state,dispatch] = useReducer(authReducer,{
        user:null
        //we can add more variables here i.e. user's age:25
        //we can access them state.user , state.age
        //
    })
    useEffect(()=>{ //if there is user key pair in local storage, just login again
        const user = JSON.parse(localStorage.getItem('user'))
        if (user){
            dispatch({type:'LOGIN',payload: user})
        }
    },[])
    console.log('AuthContext state:', state)
    return (
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}