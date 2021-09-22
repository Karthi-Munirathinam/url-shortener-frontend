import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import GlobalStyles from '@mui/material/GlobalStyles';
import axios from './Connection';
import { useHistory } from 'react-router-dom';
import Loading from './Loading';
import './Shorttable.css';

function Shorttable() {
    const [url, setUrl] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    useEffect(() => {
        const getURLS = async () => {
            try {
                let token = window.localStorage.getItem("app-token");
                if (!token) {
                    history.push('/login')
                }
                setIsLoading(true);
                let data = await axios.get('/geturl', {
                    headers: {
                        "authorization": token,
                        "Content-type": "application/json"
                    }
                });
                setUrl(data.data);
                setIsLoading(false);
            }
            catch (error) {
                setIsLoading(false);
                console.log(error)
            }
        }
        getURLS();
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
            <GlobalStyles styles={{ Table: { backgroundColor: "#ddeeff" } }} />
            <div className="row fp-container">
                <div className="fp-form-container col-12">
                    {
                        isLoading ? <Loading /> : (
                            <TableContainer component={Paper} elevation={3}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead className="table-header">
                                        <TableRow >
                                            <TableCell className="title-header">Original Url</TableCell>
                                            <TableCell className="title-header" align="center">Short Url</TableCell>
                                            <TableCell className="title-header" align="center">Total Clicks</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {url.map((row) => (
                                            <TableRow
                                                key={row.UrlID}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.originalUrl}
                                                </TableCell>
                                                <TableCell align="center"><a href={row.shortUrl} target="_blank" rel="noreferrer" >{row.shortUrl}</a></TableCell>
                                                <TableCell align="center">{row.totalClicks}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )
                    }
                </div>
            </div>
        </motion.div >
    )
}

export default Shorttable
