import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const {logout} = useLogout()
    const {user} = useAuthContext()

    const handleLogOut = () => {
        logout()
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1> Workout Buddy</h1>
                </Link>
                <Link to="/email">
                    <h1>EmailPage</h1>
                </Link>
                <nav style={{marginLeft: 'auto', display: 'flex', alignItems: 'center'}}>
                    {user && ( 
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleLogOut}> Log Out</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                        <Link to="/login"> Login</Link>
                        <Link to="/signup"> Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar;