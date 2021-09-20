import React, { useEffect, useState } from 'react'
import axios from './Connection';
import { motion } from 'framer-motion';

function Mainpage() {
    const [user, setUser] = useState([]);
    useEffect(() => {
        const getdata = async () => {
            let token = window.localStorage.getItem("app-token");
            let data = await axios.get('/user', {
                headers: {
                    "authorization": token,
                    "Content-type": "application/json"
                }
            })
            setUser(data.data[0].firstName)
        }
        getdata();
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
                    <div>
                        <h3>Hi {user} , Welcome to the UserPage</h3>
                    </div>
                </div>
            </div>
        </motion.div >
    )
}

export default Mainpage
