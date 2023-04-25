import classes from "../styles/dashboard.module.css";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import MobileNav from "../components/MobileNav";
import PageView from "../components/PageView";
import DoghnoutChart from "../components/DoghnoutChart";

export const Dashboard = () => {
// States
  const [mobileNav, setMobileNav] = useState(false);
  const [menuBtn, setMenuBtn] = useState(true);
  const [selectedItem, setSelectedItem] = useState(5);

// Handlers
  const handleOpen = () => {
    setMobileNav(true);
    setMenuBtn(false);
  };
  const handleRemoveMenu = () => {
    setMobileNav(false);
    setMenuBtn(true);
  };
  const handleItemClick = (itemId) => {
    setSelectedItem(itemId);
  };


  const dateData = [
    {
      id: 1,
      date: '1 Day'
    },
    {
      id: 2,
      date: '3 Day'
    },
    {
      id: 3,
      date: '7 Day'
    },
    {
      id: 4,
      date: '30 Day'
    },
    {
      id: 5,
      date: 'All Time'
    },
    {
      id: 6,
      date: 'Custom Date'
    }
  ]

  const dateItems = dateData.map((date) =>
  <li className={`${selectedItem === date.id ? classes.active_date : classes.default_active}`} onClick={() => handleItemClick(date.id)} key={date.id}>{date.date}</li>
);


  return (
    <section className={classes.dashboard}>
      {mobileNav && (
        <MobileNav
          handleRemoveMenu={handleRemoveMenu}
          setMobileNav={setMobileNav}
        />
      )}
      {menuBtn && (
        <FiMenu onClick={handleOpen} className={`${classes.menu}  `} />
      )}

      <section className={classes.header}>
        <h1>Dashboard</h1>

        <div className={classes.header_content}>
          <div className={classes.first_header} >
            <h2> Good Morning, Blessing⛅</h2>
            <p>Check out your dashboard summary.</p>
          </div>
          <p className={classes.anayltics_text} > View analytics</p>
        </div>

        <div className={classes.date_container} >
          {dateItems}
        </div>
      </section>


      <section>
        <PageView/>
      </section>

      <section className={classes.doughnut}>
        <DoghnoutChart/>
        <DoghnoutChart/>
      </section>
    </section>
  );
};
