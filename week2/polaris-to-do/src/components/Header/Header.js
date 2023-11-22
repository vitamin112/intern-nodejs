import { Link, TopBar } from "@shopify/polaris";
import React from "react";
import "./Header.scss";

const Header = () => {
  const userMenuMarkup = <TopBar.UserMenu name="User name" initials="D" />;
  return (
    <header>
      <Link url="/">
        <img className="logo" src="/images/logo.png" alt="Logo" />
      </Link>
      <TopBar userMenu={userMenuMarkup}></TopBar>
    </header>
  );
};

export default Header;
