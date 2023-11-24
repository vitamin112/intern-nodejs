import { ThemeProvider, TopBar } from "@shopify/polaris";
import React from "react";
import "./Header.scss";

const Header = () => {
  const userMenuMarkup = (
    <TopBar.UserMenu name="User name" avatar="/images/avatar.png" />
  );

  return (
    <div style={{ height: "60px" }}>
      <ThemeProvider
        theme={{
          logo: {
            topBarSource: "/images/logo.png",
            alt: "Logo",
            accessibilityLabel: "/",
          },
          colors: {},
          ColorScheme: "light",
        }}
      >
        <TopBar showNavigationToggle userMenu={userMenuMarkup}></TopBar>
      </ThemeProvider>
    </div>
  );
};

export default Header;
