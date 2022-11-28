import React, { useState } from "react";
import './../assets/css/login.css';

const Register = (props) => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="container">
            <div className="container_login">            <h2>S'incrire</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Nom</label>
            <input value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="Nom" id="name" name="name" />
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="votremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">Mot de passe</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit">S'incrire</button>
        </form>
    </div>l
    </div>

    )
}
export default Register;