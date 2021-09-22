import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function UrlCard({ urls }) {
    return (
        <div style={{ marginBottom: "0.5rem" }}>
            <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined" sx={{ background: "linear-gradient(to right, #ff4b2b, #ff416c)", color: "#fff" }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} gutterBottom>
                            <span className="text-uppercase" style={{ color: "#222" }}>Date: </span> {urls.date}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} gutterBottom>
                            <span className="text-uppercase" style={{ color: "#222" }}>OriginalUrl:</span>{urls.originalUrl}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} gutterBottom>
                            <span className="text-uppercase" style={{ color: "#222" }}>ShortUrl: </span><a href={urls.shortUrl} style={{ color: 'greenyellow' }} target="_blank" rel="noreferrer">{urls.shortUrl}</a>
                        </Typography>
                        <Typography sx={{ fontSize: 14 }}>
                            <span className="text-uppercase" style={{ color: "#222" }}>Clicks: </span><span style={{ color: '#ffba26', fontWeight: "bold" }}>{urls.totalClicks}</span>
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </div>
    )
}

export default UrlCard
