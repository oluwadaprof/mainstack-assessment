import classes from "../styles/mobilenav.module.css";
import logo from "../assets/mainstack-logo.png";
import { NavLink } from "react-router-dom";
import { IoIosPaper } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { TbLayoutDashboard } from "react-icons/tb";
import avatar from "../assets/blessing.png";
import { RxDotsHorizontal } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import  { useEffect, useRef } from 'react';

export default function MobileNav({handleRemoveMenu, setMobileNav}) {
    const navLinkStyle = ({ isActive }) => {
        return {
          borderLeft: isActive ? "1px solid red" : null,
          color: isActive ? "red" : null,
          textDecoration: "none",
        };
      };
    
      const menuRef = useRef(null);
      useEffect(() => {
        const handleClickOutside = (event) => {
          if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMobileNav(false);
          }
        };
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, [menuRef]);

      return (
        <nav className={classes.nav} >
          <section className={classes.top}>
            <img className={classes.logo} src={logo} alt="" />
            <IoClose className={classes.close_icon} onClick={handleRemoveMenu} />
          </section>
          <section className={classes.middle}>
            <NavLink to="/" className={`${classes.link}`} onClick={handleRemoveMenu} style={navLinkStyle}>
              <TbLayoutDashboard className={classes.icon} />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/1" className={`${classes.link}`} onClick={handleRemoveMenu} style={navLinkStyle}>
              <IoIosPaper className={classes.icon} />
              <span>Item 1</span>
            </NavLink>
            <NavLink to="/2" className={`${classes.link}`} onClick={handleRemoveMenu} style={navLinkStyle}>
              <FaRegUserCircle className={classes.icon} />
              <span>Item 2</span>
            </NavLink>
            <NavLink to="/3" className={`${classes.link}`} onClick={handleRemoveMenu} style={navLinkStyle}>
              <FiSettings className={classes.icon} />
              <span>Item 3</span>
            </NavLink>
    
            <div>
              <p>OTHERS 1</p>
              <NavLink to="/4" className={`${classes.link}`} onClick={handleRemoveMenu} style={navLinkStyle}>
                <FaRegUserCircle className={classes.icon} />
                <span>Item 4</span>
              </NavLink>
              <NavLink to="/5" className={`${classes.link}`} onClick={handleRemoveMenu} style={navLinkStyle}>
                <FiSettings className={classes.icon} />
                <span>Item 5</span>
              </NavLink>
            </div>
            <div>
              <p>OTHERS 2</p>
              <NavLink to="/6" className={`${classes.link}`} onClick={handleRemoveMenu} style={navLinkStyle}>
                <FaRegUserCircle className={classes.icon} />
                <span>Item 6</span>
              </NavLink>
              <NavLink to="/7" className={`${classes.link}`} onClick={handleRemoveMenu} style={navLinkStyle}>
                <FiSettings className={classes.icon} />
                <span>Item 7</span>
              </NavLink>
              <NavLink to="/8" className={`${classes.link}`} onClick={handleRemoveMenu} style={navLinkStyle}>
                <FiSettings className={classes.icon} />
                <span>Item 8</span>
              </NavLink>
            </div>
          </section>
          <section className={classes.bottom}>
            <div className={classes.avatar}>
              <img className={classes.avatar_img} src={avatar} alt="user avatar" />
              <span className={classes.avatar_name}>Blessing Daniels</span>
            </div>
            <RxDotsHorizontal className={classes.icon_dot} />
          </section>
        </nav>
      )
}
