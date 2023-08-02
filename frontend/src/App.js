import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Sign from './components/Sign';
import TodoList from './components/TodoList';
function App() {
  return (
    <>
       <ToastContainer />
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Sign />} />
      <Route path="/login" element={<Login />} />
      <Route path="/form" element={<TodoList />} />
      </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
