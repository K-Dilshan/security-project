import React,{useEffect, useState} from 'react';
import { Link , useNavigate} from 'react-router-dom';
import {BiMenuAltRight} from "react-icons/bi";
import { AiOutlineClose } from 'react-icons/ai';
import "./Navbar.scss";


export default function Navbar() {

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
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
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Requests">Requests</Link>
            </li>
            <li>
              <Link to="/Inventory">Inventory</Link>
            </li>
            <li>
              <Link to="/History">History</Link>
            </li>

            <Link to="/Register">
              <button className="btn">Register</button>
            </Link>
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
