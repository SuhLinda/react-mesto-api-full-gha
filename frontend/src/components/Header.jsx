import React from 'react';
import headerLogo from "../image/header__logo.svg";

function Header({email, buttonHeader}) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={headerLogo}
        alt="логотип"/>
      <div className="header__container">
          {email}
          {buttonHeader}
      </div>
    </header>
  )
}

export default Header;