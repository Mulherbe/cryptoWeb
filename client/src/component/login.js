import React, { useState } from "react";
import './../assets/css/login.css';

    const Login = (props) => {
        const [email, setEmail] = useState('');
        const [pass, setPass] = useState('');
        
        const handleSubmit = (e) => {
            e.preventDefault();
            const login = {
                email: email,
                password: pass
            } 
            console.log(login);
            }
    return (
        <div className="container">
            <div className="container_login">

            <h2>Connexion</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="votremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Mot de passe</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Se connecter</button>
            </form>
                          </div>

        </div>
    )
}
export default Login;