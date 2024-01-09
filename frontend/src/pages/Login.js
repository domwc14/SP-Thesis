import {useState} from 'react'
import { useLogin } from '../hooks/useLogin'
const Login = () => {
    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
    const{login,error,isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()  //this disables the auto refresh page

        await login(email,password)
    }

    return (
        <div >
        <h1 className='colored_title_big' style={{ textAlign: 'center', marginTop: '20px' }} > PerSafS Inventory Invoice System </h1>
        <h1 className='colored_title' style={{ textAlign: 'center' }} >IINVIS </h1>
        <form className="login" onSubmit={handleSubmit}>
            <h3> Login</h3>
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

            <button disabled={isLoading}> Login </button>  
            {error && <div className="error">{error}</div>}
        </form>
        </div>
    )
}

export default Login