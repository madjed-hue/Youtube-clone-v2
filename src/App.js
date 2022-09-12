import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

import {
  ChannelDetail,
  VideoDetail,
  SearchFeed,
  Navbar,
  Feed,
} from "./components";

export const PreferedTheme = createContext();

const App = () => {
  const [theme, setTheme] = useState("light");
  let themeMode = localStorage.getItem("mode");
  const handleThemeMode = (theme) => {
    localStorage.setItem("mode", theme);
  };
  useEffect(() => {
    if (!localStorage.getItem("mode")) {
      handleThemeMode(localStorage.getItem("mode"));
    }
    if (localStorage.getItem("mode")) {
      setTheme(localStorage.getItem("mode"));
    }
  }, [theme, themeMode]);

  return (
    <BrowserRouter>
      <PreferedTheme.Provider value={{ theme, setTheme, handleThemeMode }}>
        <Box sx={{ backgroundColor: theme === "light" ? "#fff" : "#000" }}>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Feed />} />
            <Route path="/video/:id" element={<VideoDetail />} />
            <Route path="/channel/:id" element={<ChannelDetail />} />
            <Route path="/search/:searchTerm" element={<SearchFeed />} />
          </Routes>
        </Box>
      </PreferedTheme.Provider>
    </BrowserRouter>
  );
};
export default App;
