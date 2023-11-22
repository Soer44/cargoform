import React from "react";
import "../../styles/_base.scss";

const Header = () => {
  return (
    <header className="header__container">
      <div className="header__logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="31"
          height="31"
          viewBox="0 0 31 31"
          fill="none"
        >
          <circle cx="15.5" cy="15.5" r="15.5" fill="white" />
        </svg>
      </div>
      <nav className="header__menu">
        <ul>
          <li>
            <a href="#delivery" className="linkHover">Доставка и оплата</a>
          </li>
          <li className="activeLink">
		  <a  href="/SendCargo" >
            Отправить груз
          </a>
          </li>
          <li>
            <a href="#contacts" className="linkHover">Контакты</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
