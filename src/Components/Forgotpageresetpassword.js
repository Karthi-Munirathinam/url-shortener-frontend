import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import axios from './Connection';
import Loading from './Loading';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

function Forgotpageresetpassword() {
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [reset, setReset] = useState(false);
    const [userID, setUserID] = useState('')
    const history = useHistory();
    let query = useQuery();

    useEffect(() => {
        const checkQuery = async () => {
            try {
                setIsLoading(true);
                let data = await axios.post('/resetpassword', {
                    tk: query.get("tk")
                })
                setUserID(data.data.userid)
                if (data.data.token === "valid") {
                    setReset(true);
                }
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error)
            }
        }
        checkQuery()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const formik = useFormik({
        initialValues: {
            password: '',
            confirmpassword: ''
        },
        validate: (values) => {
            let errors = {};
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
            const changePassword = async () => {
                try {
                    setIsLoading(true);
                    await axios.post('/changepassword', {
                        userid: userID,
                        password: values.password
                    });
                    setPasswordChanged(true);
                    history.push('/login')
                    setIsLoading(false);
                } catch (error) {
                    setIsLoading(false);
                    console.log(error);
                }
            }
            changePassword();
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
                    {
                        isLoading ? <Loading /> : (
                            reset ? (
                                <form onSubmit={formik.handleSubmit} method="post" >
                                    <h2 className="text-center mb-3">Reset Password</h2>
                                    <div className="text-center">
                                        <div>
                                            <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} className="fp-password-input" placeholder="password" />
                                            {formik.errors.password ? <div className="fp-errors col-12">{formik.errors.password}</div> : null}
                                        </div>
                                        <div>
                                            <input type="password" name="confirmpassword" value={formik.values.confirmpassword} onChange={formik.handleChange} className="fp-password-input" placeholder="confirm password" />
                                            {formik.errors.confirmpassword ? <div className="fp-errors col-12">{formik.errors.confirmpassword}</div> : null}
                                        </div>
                                    </div>
                                    <div className="col-12 text-center mt-4">
                                        <input type="submit" value="Submit" className="btn fp-submit-btn" />
                                    </div>
                                    {
                                        passwordChanged ? (
                                            <div className="col-12 text-center mt-4">
                                                <h4>Password changed successfully</h4>
                                            </div>
                                        ) : null
                                    }
                                </form>
                            ) : (
                                <div>
                                    <h3>Please check the link</h3>
                                </div>
                            )

                        )
                    }
                </div>
            </div>
        </motion.div >
    )
}

export default Forgotpageresetpassword
