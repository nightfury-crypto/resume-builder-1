import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase-setup/firebase";
import "./Header.css";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
// react router dom
import {Link} from "react-router-dom";

const Header = ({ signIn, handlesignout }) => {
    const [user] = useAuthState(auth);
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (user) {
            if (user.photoURL) {
                setAvatar(user.photoURL)
            } else {
                let txt = user.displayName[0].trim()
                setAvatar(txt)
            }
        }
    }, [user])

    // menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className="header">
            <Link to="/" style={{textDecoration:"none"}}>
            <div className="left">
                <img src="https://cdn-icons-png.flaticon.com/512/2986/2986347.png"
                    alt="resume-logo" className="logo" referrerPolicy="no-referrer" />
                <h5>
                    <span>RESUME</span>
                    <span>BUILDER</span>
                </h5>
            </div>
            </Link>

            <div className="right">
                <>
                    <ul>
                        <li><Link to="/">HOME</Link></li>
                        <li><Link to="/about">ABOUT</Link></li>
                        <li><Link to="/resume">CREATE RESUME</Link></li>
                        <li><Link to="/contact">CONTACT US</Link></li>
                    </ul>
                    <ul>
                        {user ? <li className="avatar-li" ><div className="avatar"
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}>
                            <Avatar alt={user.displayName} src={avatar} />
                        </div>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={() => { handleClose(); handlesignout(); }}>Logout</MenuItem>
                            </Menu>
                        </li> :
                            <li className="selected" onClick={signIn}>LOGIN</li>}
                    </ul>
                </>

            </div>
        </div>
    )
}
export default Header;
