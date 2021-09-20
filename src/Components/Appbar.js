import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import '../App.css';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    link: {
        textDecoration: "none",
        color: "white"
    },
}));

function Appbar({ loggedIn, setlogin }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const history = useHistory();
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleLogOut = () => {
        window.localStorage.removeItem("app-token");
        setlogin(false);
        history.push('/')
    }
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {
                loggedIn ? (
                    <MenuItem>
                        <Button variant="contained" color="secondary" onClick={handleLogOut}>
                            Logout
                        </Button>
                    </MenuItem>
                ) : (
                    <span>
                        <MenuItem>
                            <Link to="/login" className={`${classes.link} text-decoration-none`}>
                                <Button variant="contained" color="secondary" style={{ marginRight: "0.5rem" }}>
                                    Login
                                </Button>
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to="/register" className={`${classes.link} text-decoration-none`}>
                                <Button variant="contained" color="secondary">
                                    Sign up
                                </Button>
                            </Link>
                        </MenuItem>
                    </span>
                )
            }
        </Menu>
    );
    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <Link to="/" className={`${classes.link}  text-decoration-none`}>
                        <Typography variant="h5" className="brand-text" noWrap>
                            Brand FP
                        </Typography>
                    </Link>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop} >
                        {
                            loggedIn ? (
                                <Button variant="contained" color="secondary" onClick={handleLogOut}>
                                    Logout
                                </Button>
                            ) : (
                                <span>
                                    <Link to="/login" className={`${classes.link}  text-decoration-none`}>
                                        <Button variant="contained" color="secondary" style={{ marginRight: "0.5rem" }}>
                                            Login
                                        </Button>
                                    </Link>
                                    <Link to="/register" className={`${classes.link}  text-decoration-none`} style={{ marginRight: "0.5rem" }}>
                                        <Button variant="contained" color="secondary">
                                            Sign up
                                        </Button>
                                    </Link>
                                </span>
                            )
                        }





                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    )
}

export default Appbar
