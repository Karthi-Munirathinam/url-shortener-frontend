import React, { useState } from 'react'
import './login.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import axios from './Connection';
function Login({ handleLog }) {
    const [loginError, setLoginError] = useState(false);

    const history = useHistory();
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validate: (values) => {
            let errors = {};
            if (!values.username) {
                errors.username = "Username required"
            } else if (values.username.length < 5 && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)) {
                errors.username = "Invalid email address"
            }
            if (!values.password) {
                errors.password = "Password required"
            }
            return errors;
        },
        onSubmit: (values) => {
            const login = async () => {
                try {
                    let token = await axios.post('/login', {
                        email: values.username,
                        password: values.password
                    });
                    window.localStorage.setItem("app-token", token.data.token);
                    handleLog();
                    history.push('/mainpage');
                } catch (error) {
                    setLoginError(true)
                    console.log(error)
                }
            }
            login()
        }
    })
    return (
        <motion.div
            key="login"
            initial={{ x: "-100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "200vw", opacity: 0 }}
            transition={{
                delay: 0.1,
                x: { type: "spring", stiffness: 30 },
            }}
            className="container-lg full-container mt-4">
            <div className="row sign-in-container">
                <div className="login-form-container col-md-6">
                    <form className="login-form container" method="post" onSubmit={formik.handleSubmit}>
                        <div className="row p-2">
                            <h1 className="col-12 signin-title">Sign in</h1>
                        </div>
                        <div className="row input-container">
                            <input type="text" name="username" value={formik.values.username} onChange={formik.handleChange} className="username-input mb-3 col-12" placeholder="Username" />
                            {formik.errors.username ? <div className="errors col-12">{formik.errors.username}</div> : null}
                            <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} className="password-input col-12" placeholder="Password" />
                            {formik.errors.password ? <div className="errors col-12">{formik.errors.password}</div> : null}
                        </div>
                        {
                            loginError ? (
                                <div className="text-center mt-1 mb-1" style={{ color: "crimson", fontSize: "0.8rem" }}>Username/Password doesnot match</div>
                            ) : null
                        }
                        <div className="row fp-content p-3">
                            <div className="col-12 text-center "><Link to='/forgotpassword' className="fp-text">Forgot your password?</Link></div>
                        </div>
                        <div className="row p-2">
                            <div className="col-12 sign-in-btn-container">
                                <input type="submit" value="Sign in" className="btn signin-btn" />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="content-container col-md-6">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 content-right-container">
                                <h1 className="mb-3">Don't have an account?</h1>
                                <p className="mb-3">Enter your personal details and start journey with us</p>
                                <Link to="/register"><button className="sign-up-btn" >Sign Up</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Login
