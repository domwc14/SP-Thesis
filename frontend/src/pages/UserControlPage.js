import {useState} from 'react'
import { useSignup } from '../hooks/useSignup'
import Box from '@mui/material/Box';
import NavDrawer from "../components/NavDrawer";

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
    const{signup,isLoading,error} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()  //this disables the auto refresh page

        await signup(email,password)
    }

    return (
    <Box sx={{display: 'grid', gridTemplateColumns: '210px 1fr', gap:3,}}>
        <div><NavDrawer/></div>
        <div>
        {/* className="signup" */}
        <form className="createuser" onSubmit={handleSubmit}>
            <h3> Create A User</h3>
            <label> Username: </label>
            <input 
            type="text"
            onChange={(e)=> setEmail(e.target.value)}
            value={email}
            />

            <label> Password: </label>
            <input 
            type="password"
            onChange={(e)=> setPassword(e.target.value)}
            value={password}
            />

            <button disabled={isLoading}> Sign up </button>
            {error && <div className='error'>{error}</div>}

        </form>
        </div>
    </Box>
    )
}

export default Signup