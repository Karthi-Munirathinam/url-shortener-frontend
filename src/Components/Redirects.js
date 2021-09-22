import React, { useEffect } from 'react'

function Redirects(props) {
    useEffect(() => {
        console.log(props.match.params);
    }, [])
    return (
        <div>
            HI
        </div>
    )
}

export default Redirects
