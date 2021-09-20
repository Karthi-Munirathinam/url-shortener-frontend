import React from 'react'
import { motion } from 'framer-motion';

function Homepage() {

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
                        <h5>Forgot password homepage</h5>
                    </div>
                </div>
            </div>
        </motion.div >
    )
}

export default Homepage
