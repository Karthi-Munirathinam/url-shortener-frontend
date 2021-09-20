import React, { useState } from 'react'
import './Register.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import axios from './Connection';

function Signup() {
    const [userexist, setuserexist] = useState(false);
    const history = useHistory();
    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmpassword: ''
        },
        validate: (values) => {
            let errors = {};
            if (!values.firstname) {
                errors.firstname = "Firstname required"
            } else if (values.firstname.length < 3) {
                errors.firstname = "Firstname must contain atleast 3 characters"
            }
            if (!values.lastname) {
                errors.lastname = "Lastname required"
            }
            if (!values.email) {
                errors.email = "email required"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address"
            }
            if (!values.password) {
                errors.password = "Password required"
            } else if (values.password.length < 8) {
                errors.password = "Password must contain atleast 8 characters"
            }
            if (values.password !== values.confirmpassword) {
                errors.confirmpassword = "Password/Confirm password doesnot match"
            }
            return errors;
        },
        onSubmit: (values) => {
            const postdata = async () => {
                try {
                    let user = await axios.post('/register', {
                        firstName: values.firstname,
                        lastName: values.lastname,
                        email: values.email.toLowerCase(),
                        password: values.password
                    });

                    if (user.data.userexists) {
                        setuserexist(true);
                    } else {
                        history.push('/login')
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            postdata();
        }
    })

    return (
        <AnimatePresence exitBeforeEnter>
            <motion.div
                key="signup"
                initial={{ x: "-100vw", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "200vw", opacity: 0 }}
                transition={{
                    delay: 0.1,
                    x: { type: "spring", stiffness: 30 },
                }}
                className="container-lg full-container mt-4 mb-4">
                <div className="row sign-up-container">
                    <div className="content-container-left col-md-6">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 content-right-container">
                                    <h1 className="mb-3">Already have an account?</h1>
                                    <p className="mb-3">To keep connected with us please login with your username</p>
                                    <Link to='/login'><button className="sign-up-btn">Sign in</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="login-form-container col-md-6">
                        <form className="login-form container" onSubmit={formik.handleSubmit} method="post">
                            <div className="row p-2">
                                <h1 className="col-12 signin-title">Create Account</h1>
                                <div className="col-12 text-center">use your email for registration</div>
                            </div>
                            <div className="input-container pb-3">
                                <div className="row">
                                    <input type="text" name="firstname" value={formik.values.firstname} onChange={formik.handleChange} className="firstname-input col-12" placeholder="Firstname" />
                                    {formik.errors.firstname ? <span className="errors col-12">{formik.errors.firstname}</span> : null}
                                </div>
                                <div className="row">
                                    <input type="text" name="lastname" value={formik.values.lastname} onChange={formik.handleChange} className="lastname-input col-12" placeholder="Lastname" />
                                    {formik.errors.lastname ? <span className="errors col-12">{formik.errors.lastname}</span> : null}
                                </div>
                                <div className="row">
                                    <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} className="email-input col-12" placeholder="Email" />
                                    {formik.errors.email ? <div className="errors col-12">{formik.errors.email}</div> : null}
                                </div>
                                <div className="row">
                                    <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} className="password-input col-md-6" placeholder="Password" />
                                    <input type="password" name="confirmpassword" value={formik.values.confirmpassword} onChange={formik.handleChange} className="password-input col-md-6" placeholder="Confirm password" />
                                    {formik.errors.password ? <div className="errors col-12">{formik.errors.password}</div> : null}
                                    {formik.errors.confirmpassword ? <div className="errors col-12">{formik.errors.confirmpassword}</div> : null}
                                </div>
                                {userexist ? (<div>
                                    <div className="text-center mt-1" style={{ color: "crimson" }}>user already exists. try <Link to="/login" style={{ textDecoration: "none" }}>Login</Link></div>
                                </div>) : null}
                            </div>
                            <div className="row p-2">
                                <div className="col-12 sign-in-btn-container">
                                    <input type="submit" value="Sign up" className="btn signin-btn" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default Signup
