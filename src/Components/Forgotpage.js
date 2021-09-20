import React from 'react';
import './forgotpage.css';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useFormik } from 'formik';
import axios from './Connection';
import { Link } from 'react-router-dom';

function Forgotpage() {

    const [fpsubmit, setFpsubmit] = useState(false);
    const [userexists, setUserExists] = useState(true);
    const formikemail = useFormik({
        initialValues: {
            email: ''
        },
        validate: (values) => {
            let errors = {}
            if (!values.email) {
                errors.email = "Email required"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address"
            }
            return errors;
        },
        onSubmit: (values) => {
            const forgotPasswordSubmit = async () => {
                try {
                    let data = await axios.post('/forgotpassword', {
                        email: values.email
                    });
                    if (!data.data.exists) {
                        setUserExists(false);
                    } else if (data.data.exists) {
                        setFpsubmit(true);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            forgotPasswordSubmit()
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
            className="container-lg mt-4">
            <div className="row fp-container">
                <div className="fp-form-container col-12">
                    <form onSubmit={formikemail.handleSubmit} method="post">
                        <h2 className="text-center mb-3">Forgot Password ?</h2>
                        <h5 className="text-center mb-4">Enter your registered email to reset the password</h5>
                        <div>
                            <input type="email" name="email" value={formikemail.values.email} onChange={formikemail.handleChange} className="fp-email-input col-12" placeholder="email" />
                            {formikemail.errors.email ? <div className="fp-errors col-12">{formikemail.errors.email}</div> : null}
                        </div>
                        {
                            fpsubmit ?
                                (
                                    <div className="text-center font-weight-light" style={{ fontSize: "0.8rem" }}>
                                        <h3>Check your mail for password reset link.</h3>
                                    </div>
                                )
                                : null
                        }
                        {
                            userexists ? null : (
                                <div className="text-center font-weight-light">
                                    <h3>User doesn't exist, please <Link to="/register" className="text-decoration-none">register</Link></h3>
                                </div>
                            )
                        }
                        <div className="col-12 text-center mt-4">
                            <input type="submit" value="Reset password" className="btn fp-submit-btn" />
                        </div>
                    </form>

                </div>
            </div>
        </motion.div>
    )
}

export default Forgotpage
