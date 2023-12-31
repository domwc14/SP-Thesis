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
        <header style={{ fontSize: '18px', padding: '10px', background: 'rgba(0, 0, 0, 1)'  }}>
            <div className="container">
                {/* <Link to="/">
                    <h1> Workout Buddy</h1>
                </Link>
                <Link to="/email">
                    <h1>EmailPage</h1>
                </Link> */}
                <nav style={{marginLeft: 'auto', display: 'flex', alignItems: 'center'}}>
                <img
                src={`/persafslogo.png`}
                alt="Logo"
                height={55}
                width={55}
                style={{ marginRight: '10px' }}
                />
                    {user && ( 
                        <div>

                            <span>{user.email}</span>
                            <button onClick={handleLogOut}> Log Out</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                        {/* <Link to="/login" className='white_button'>
                        <button>Login</button>
                        </Link> */}
                        <Link className='white_button' to="/login">Login</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar;