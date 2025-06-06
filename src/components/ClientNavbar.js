import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {BiMenuAltRight} from "react-icons/bi";
import { AiOutlineClose } from 'react-icons/ai';

export default function ClientNavbar() {

   const navigate = useNavigate();
   const [menuOpen, setMenuOpen] = useState(false);
   const [size, setSize] = useState({
    width: 0,
    height: 0,
   });
   useEffect(() =>  {
    const handleResize = () =>  {
        setSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };
    window.addEventListener("resize", handleResize);
    return () =>    window.removeEventListener("resize", handleResize);
   },   []);
   useEffect(() =>  {
    if(size.width > 768 && menuOpen) {
        setMenuOpen(false);
    }
   }, [size.width, menuOpen]);

   const menuToggleHandler = () =>  {
        setMenuOpen((p) =>  !p);
   };

   const logoutHandler = () =>  {
    localStorage.removeItem('token');
    navigate('/Login');
   };

  return (
    <header className="header">
      <div className="header__content">
        <Link to="/" className="header__content__logo">
          Ace Healthcare
        </Link>
        <nav
          className={`${"header__content__nav"} 
          ${menuOpen && size.width < 768 ? `${"isMenu"}` : ""} 
          }`}
        >
          <ul>
            <li>
              <Link to="/ClientHome">Home</Link>
            </li>
            <li>
              <Link to="/GoodsReciept">Goods Recipt</Link>
            </li>
            <li>
              <Link to="/GoodsIssue">Goods Issue</Link>
            </li>
            <li>
              <Link to="/ClientInventory">Inventory</Link>
            </li>

            <li>
              <button className="btn btn__login" onClick={logoutHandler}>Log Out</button>
            </li>
          </ul>
        </nav>
        <div className="header__content__toggle">
          {!menuOpen ? (
            <BiMenuAltRight onClick={menuToggleHandler} />
          ) : (
            <AiOutlineClose onClick={menuToggleHandler} />
          )}
        </div>
      </div>
    </header>
  )
}