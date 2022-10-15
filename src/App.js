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
        mediaQuery: "max-width: 485px",
      },
      tablet: {
        mediaQuery: "max-width: 960px",
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
