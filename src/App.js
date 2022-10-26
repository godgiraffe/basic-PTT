import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import BoardList from "./pages/BoardList/BoardList";
import ArticleList from "./pages/ArticleList/ArticleList";
import ArticleContent from "./pages/ArticleContent/ArticleContent";
import { ThemeProvider } from "styled-components";

const theme = {
  default: {
    devices: {
      mobile: {
        mediaQuery: "screen and (max-width: 485px)",
        hookMediaQuery: "(max-width: 485px)",
        color: '#f00',
      },
      tablet: {
        mediaQuery: "screen and (max-width: 960px)",
        hookMediaQuery: "(max-width: 960px)",
      },
      desktop: {
        mediaQuery: "screen and (max-width: 1200px)",
        hookMediaQuery: "(max-width: 1200px)",
      }
    },
  },
};


function App() {
  return (
    <ThemeProvider theme={theme.default}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<BoardList />}></Route>
            <Route
              path="/ArticleList/:boardName"
              element={<ArticleList />}
            ></Route>
            <Route
              path="/ArticleContent/:boardName/:ArticleId"
              element={<ArticleContent />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
