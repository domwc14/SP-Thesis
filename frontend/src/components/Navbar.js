import {Link,useLocation} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const {logout} = useLogout()
    const {user} = useAuthContext()

    const handleLogOut = () => {
        logout()
    }

    const location = useLocation();

    const HeaderTitle = () => {
        if(location.pathname === "/login"){
            return "PerSafS Marketing Corporation"
        }
        if(location.pathname !== "/login"){
            const pathParts = location.pathname.split('/');
            const firstPart = pathParts[1]
            console.log("TEXT SENT BACK HERE",  firstPart.charAt(0).toUpperCase() + firstPart.slice(1))
            return firstPart.charAt(0).toUpperCase() + firstPart.slice(1);
        }

    }

    return (
        <header style={{ fontSize: '18px', padding: '10px', background: 'rgba(0, 0, 0, 1)',   }}>
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

                            <span style={{ color: 'var(--primary' }}>{user.email}</span>
                            <button onClick={handleLogOut}> Log Out</button>
                            {/* --primary: #1aac83;
                            --error: #e7195a;
                            --secondary: rgb(25, 143, 117);
                            --tertiary: rgb(13, 102, 77);
                            --darkergreen1: #155e49;
                            --gptgreen: #10a37f; */}
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