import React from 'react';
import { useEffect, useState } from "react";
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {loginUser} from '../service/call_api/user_service';
import './../assets/css/login.css';

 const Login = (props) => {
    const [datas, setDatas] = useState([]);

    const initialValues = {
        email: "",
        password: "",
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("email invalide")
            .required("l'email est obligatoire"),
        password: Yup.string()
            .required("Mot de passe est obligatoire")
            .min(8, "Mot de passe doit être plus grand que 8 caractères")
            .max(50, "Mot de passe doit être plus petit que 50 caractères"),
    });



    const handleSubmit = (values) => {

        loginUser(values).then(response =>setDatas(response)).then(
        localStorage.setItem("username",datas.data.username),
        localStorage.setItem("email",datas.data.email),
        localStorage.setItem("role",datas.data.role),
        localStorage.setItem("token",datas.data.access_token),
        );
    };
     return (
        <div className="container_2">
            <div className="container_login">
                    <h1 className="text-center">Inscription</h1>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values) =>handleSubmit(values)}
                    >
                        {({ resetForm }) => (
                            <Form className="register-form">                                  
                                <div className="form_style">
                                    <label htmlFor="email">
                                        Email:
                                    </label>
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form_input"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="small"
                                        className="error_form"
                                    />
                                </div>
                                <div className="form_style">
                                    <label htmlFor="password">
                                        Mot de passe:
                                    </label>
                                    <Field
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form_input"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="small"
                                        className="error_form"
                                    />
                                </div>
                                
                             
                                <div className="form-group d-flex justify-content-end gap-3">
                                    <button
                                        type="submit"
                                        className="btn form_input"
                                    >
                                        Se connecter
                                    </button>

                                </div>

                            </Form>
                        )}
                    </Formik>
                    <button type="submit" className="btn form_input">
                        S'inscrire'
                    </button>
            </div>
        </div>

     )
 }

 export default Login;






// import React, { useState } from "react";
// import './../assets/css/login.css';

//     const Login = (props) => {
//         const [email, setEmail] = useState('');
//         const [pass, setPass] = useState('');
        
//         const handleSubmit = (e) => {
//             e.preventDefault();
//             const login = {
//                 email: email,
//                 password: pass
//             } 
//             console.log(login);
//             }
//     return (
//         <div className="container">
//             <div className="container_login">

//             <h2>Connexion</h2>
//             <form className="login-form" onSubmit={handleSubmit}>
//                 <label htmlFor="email">Email</label>
//                 <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="votremail@gmail.com" id="email" name="email" />
//                 <label htmlFor="password">Mot de passe</label>
//                 <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
//                 <button type="submit">Se connecter</button>
//             </form>
//                           </div>

//         </div>
//     )
// }
// export default Login;