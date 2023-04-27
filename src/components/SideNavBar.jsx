import classes from "../styles/sidenavbar.module.css";
import logo from "../assets/mainstack-logo.png";
import { NavLink } from "react-router-dom";
import { TbLayoutDashboard } from "react-icons/tb";
import avatar from "../assets/blessing.png";
import { RxDotsHorizontal } from "react-icons/rx";
import { GiPencil } from "react-icons/gi";
import { HiOutlineUsers } from "react-icons/hi";
import { GiSandsOfTime } from "react-icons/gi";
import { TbCameraPlus } from "react-icons/tb";
import { CiPillsBottle1 } from "react-icons/ci";
import { CiYoutube } from "react-icons/ci";
import { HiOutlineNewspaper } from "react-icons/hi";
import { IoAlarmOutline } from "react-icons/io5";





export default function SideNavBar() {
  const navLinkStyle = ({ isActive }) => {
    return {
      borderLeft: isActive ? "1px solid red" : null,
      color: isActive ? "red" : null,
      textDecoration: "none",
    };
  };

  return (
    <nav className={classes.nav}>
      <section className={classes.top}>
        <img className={classes.logo} src={logo} alt="" />
      </section>
      <section className={classes.middle}>
        <NavLink to="/" className={`${classes.link}`} style={navLinkStyle}>
          <TbLayoutDashboard className={classes.icon} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/1" className={`${classes.link}`} style={navLinkStyle}>
          <GiPencil className={classes.icon} />
          <span>Item 1</span>
        </NavLink>
        <NavLink to="/2" className={`${classes.link}`} style={navLinkStyle}>
          <HiOutlineUsers className={classes.icon} />
          <span>Item 2</span>
        </NavLink>
        <NavLink to="/3" className={`${classes.link}`} style={navLinkStyle}>
          <GiSandsOfTime className={classes.icon} />
          <span>Item 3</span>
        </NavLink>

        <div>
          <p>OTHERS 1</p>
          <NavLink to="/4" className={`${classes.link}`} style={navLinkStyle}>
            <TbCameraPlus className={classes.icon} />
            <span>Item 4</span>
          </NavLink>
          <NavLink to="/5" className={`${classes.link}`} style={navLinkStyle}>
            <CiPillsBottle1 className={classes.icon} />
            <span>Item 5</span>
          </NavLink>
        </div>
        <div>
          <p>OTHERS 2</p>
          <NavLink to="/6" className={`${classes.link}`} style={navLinkStyle}>
            <CiYoutube className={classes.icon} />
            <span>Item 6</span>
          </NavLink>
          <NavLink to="/7" className={`${classes.link}`} style={navLinkStyle}>
            <HiOutlineNewspaper className={classes.icon} />
            <span>Item 7</span>
          </NavLink>
          <NavLink to="/8" className={`${classes.link}`} style={navLinkStyle}>
            <IoAlarmOutline className={classes.icon} />
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
  );
}
