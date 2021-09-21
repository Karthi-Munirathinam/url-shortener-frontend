import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function UrlCard({ urls }) {
    return (
        <div style={{ marginBottom: "0.5rem" }}>
            <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined" sx={{ backgroundColor: "#333333", color: "#23dede" }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} gutterBottom>
                            <span className=" text-uppercase" style={{ color: "#fff" }}>Created At: </span> {urls.date}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }}>
                            <span className=" text-uppercase" style={{ color: "#fff" }}>OriginalUrl:</span>{urls.originalUrl}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }}>
                            <span className=" text-uppercase" style={{ color: "#fff" }}>ShortUrl: </span><a href={urls.shortUrl} target="_blank" rel="noreferrer">{urls.shortUrl}</a>
                        </Typography>
                        <Typography sx={{ fontSize: 14 }}>
                            <span className=" text-uppercase" style={{ color: "#fff" }}>Total Clicks: </span>{urls.totalClicks}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </div>
    )
}

export default UrlCard
