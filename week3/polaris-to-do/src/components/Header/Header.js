import { TopBar } from "@shopify/polaris";
import React from "react";
import "./Header.scss";

const Header = () => {
  const userMenuMarkup = (
    <TopBar.UserMenu name="User name" avatar="/images/avatar.png" />
  );

  return <TopBar showNavigationToggle userMenu={userMenuMarkup}></TopBar>;
};

export default Header;
