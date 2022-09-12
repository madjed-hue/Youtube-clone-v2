import React, { useContext } from "react";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { PreferedTheme } from "../App";

import { logo } from "../utils/constants";
import { SearchBar } from "./";

const Navbar = () => {
  const { theme, setTheme, handleThemeMode } = useContext(PreferedTheme);
  return (
    <Stack
      direction="row"
      alignItems="center"
      p={2}
      sx={{
        position: "sticky",
        background: theme === "light" ? "#fff" : "#000",
        top: 0,
        justifyContent: "space-between",
        zIndex: 3,
      }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="logo" height={45} />
      </Link>
      <div
        className="theming"
        style={{ display: "flex", alignItems: "center" }}
      >
        {theme === "light" ? (
          <DarkModeIcon
            sx={{ mr: 5, cursor: "pointer" }}
            fontSize="medium"
            onClick={() => {
              setTheme("dark");
              handleThemeMode("dark");
            }}
          />
        ) : (
          <WbSunnyIcon
            sx={{ mr: 5, color: "#fff", cursor: "pointer" }}
            fontSize="medium"
            onClick={() => {
              setTheme("light");
              handleThemeMode("light");
            }}
          />
        )}
        <SearchBar />
      </div>
    </Stack>
  );
};

export default Navbar;
