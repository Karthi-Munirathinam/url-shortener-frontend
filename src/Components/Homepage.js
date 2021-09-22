import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import Loading from './Loading';
function Homepage() {
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory()
    useEffect(() => {
        setIsLoading(true);
        let token = window.localStorage.getItem("app-token");
        if (token) {
            history.push('/dashboard');
            setIsLoading(false);
        } else {
            history.push('/login');
            setIsLoading(false);
        }
        setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
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
                            <div>
                                <h5>Url shortener homepage</h5>
                            </div>
                        )
                    }

                </div>
            </div>
        </motion.div >
    )
}

export default Homepage
