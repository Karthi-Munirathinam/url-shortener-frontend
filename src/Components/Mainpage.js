import React, { useEffect, useState } from 'react'
import axios from './Connection';
import { motion } from 'framer-motion';
import Loading from './Loading';
import { Link, useLocation } from 'react-router-dom';
// import { useHistory, } from 'react-router-dom';
const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}
function Mainpage() {
    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    let query = useQuery();
    useEffect(() => {
        const checkQuery = async () => {
            try {
                setIsLoading(true);
                let data = await axios.post('/activateaccount', {
                    tk: query.get("tk")
                })
                setUser(data.data.username)
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error)
            }
        }
        checkQuery()
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
                                <h3>Hi {user} , Welcome to the URLShortener</h3>
                                <h4><Link to="/login">Login</Link> to continue!</h4>
                            </div>
                        )
                    }
                </div>
            </div>
        </motion.div >
    )
}

export default Mainpage
