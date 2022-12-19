import './../assets/css/style.css';
import { Link } from 'react-router-dom';

const LoginRegister = () => {

  return (
    <>
        <div className="container">
            <div className="container_login-register">
                <Link   className="nav_login-register" to="/register">Register</Link> 
                <Link   className="nav_login-register" to="/login">Login</Link> 
            </div>
        </div>
    </>
  ); }


export default LoginRegister;