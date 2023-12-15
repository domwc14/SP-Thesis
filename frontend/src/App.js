import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
//pages and components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from "./pages/Signup";
import Navbar from './components/Navbar'
import EmailPage from './pages/EmailPage'
import InventoryPage from './pages/InventoryPage'
import SalesInvoicePage from "./pages/SalesInvoicePage";
import ClientPage from "./pages/ClientPage"
import AlertPage from "./pages/AlertPage"



//Navigate vs Link, basically acts the same (direct to page). Link does a navigate. navigate is the act of direction
//we use navigate here as a redirect to pag walang user (protect routes)

//TO CONSIDER
//<Route path="/clients" element={<ClientPage />} />
//here we can use URL and type /clients to go to clients page BUT since fetch has Auth bearer, it's stuck on loading.
//and is NOT redirected to /login. BUT if we use:
//<Route path="/salesinvoice" element={user ? <SalesInvoicePage />: <Navigate to="/login"/>} />
//the problem is pag refresh, it loses the user (nareretrieve lng siya sa localstorage after) tapos redireted to 
//<Route path="/login" element={!user ? <Login />: <Navigate to="/"/>} /> which wala paren user so it goes to /
//
function App() {
  const {user} = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/login"/>} /> 
            <Route path="/email" element={user ? <EmailPage /> :<Navigate to="/login"/>} />
            <Route path="/product" element={user ? <InventoryPage />: <Navigate to="/login"/>} />
            <Route path="/salesinvoice" element={user ? <SalesInvoicePage />: <Navigate to="/login"/>} />
            <Route path="/clients" element={<ClientPage />} />
            <Route path="/alerts" element={<AlertPage />} />
            <Route path="/login" element={!user ? <Login />: <Navigate to="/"/>} />
            <Route path="/signup" element={!user ? <Signup />: <Navigate to="/"/>} />
    



          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
