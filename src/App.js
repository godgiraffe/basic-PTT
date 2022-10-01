import React from 'react';
import { BrowserRouter,Routes, Route, Outlet, Link } from 'react-router-dom';
import Layout from './pages/Layout';
import BoardList from './pages/BoardList/BoardList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<BoardList />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;