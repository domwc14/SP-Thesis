import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
//pages and components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from "./pages/Signup";
import Navbar from './components/Navbar'
import EmailPage from './pages/EmailPage'
import InventoryPage from './pages/InventoryPage'


//Navigate vs Link, basically acts the same (direct to page). Link does a navigate. navigate is the act of direction
//we use navigate here as a redirect to pag walang user (protect routes)
function App() {
  const {user} = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/login"/>} /> 
            <Route path="/email" element={user ? <EmailPage />: <Navigate to="/login"/>} />
            <Route path="/product" element={user ? <InventoryPage />: <Navigate to="/"/>} />
            <Route path="/login" element={!user ? <Login />: <Navigate to="/"/>} />
            <Route path="/signup" element={!user ? <Signup />: <Navigate to="/"/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
