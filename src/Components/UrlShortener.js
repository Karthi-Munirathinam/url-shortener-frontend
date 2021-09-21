import React from 'react';
import './forgotpage.css';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useFormik } from 'formik';
import axios from './Connection';
import validator from 'validator'
import { useHistory } from 'react-router-dom';
// import { Link } from 'react-router-dom';

function UrlShortener() {

    const [fpsubmit, setFpsubmit] = useState(false);
    const history = useHistory();
    const formik = useFormik({
        initialValues: {
            Url: ''
        },
        validate: (values) => {
            let errors = {}
            if (!values.Url) {
                errors.Url = "Url required"
            } else if (!validator.isURL(values.Url)) {
                errors.Url = "Invalid Url address"
            }
            return errors;
        },
        onSubmit: (values) => {
            const forgotPasswordSubmit = async () => {
                try {
                    let token = window.localStorage.getItem("app-token");
                    if (!token) {
                        history.push('/login')
                    }
                    let data = await axios.post('/short', {
                        originalURL: values.Url
                    }, {
                        headers: {
                            "authorization": token,
                            "Content-type": "application/json"
                        }
                    });
                    if (data.data.message === "Invalid Original Url") {
                        setFpsubmit(true)
                    } else {
                        history.push('/shorttable')
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
                    <form onSubmit={formik.handleSubmit} method="post">
                        <h5 className="text-center mb-4">Enter the URL with http(s)</h5>
                        <div>
                            <input type="text" name="Url" value={formik.values.Url} onChange={formik.handleChange} className="fp-email-input col-12" placeholder="Url" />
                            {formik.errors.Url ? <div className="fp-errors col-12">{formik.errors.Url}</div> : null}
                        </div>
                        {
                            fpsubmit ?
                                (
                                    <div className="text-center font-weight-light" style={{ fontSize: "0.8rem" }}>
                                        <h3>Please Enter a valid Url</h3>
                                    </div>
                                )
                                : null
                        }

                        <div className="col-12 text-center mt-4">
                            <input type="submit" value="create url shortener" className="btn fp-submit-btn" />
                        </div>
                    </form>

                </div>
            </div>
        </motion.div>
    )
}

export default UrlShortener
