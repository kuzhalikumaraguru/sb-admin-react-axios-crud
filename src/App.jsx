import React, { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";

function App() {

  return <div id="wrapper">
    <BrowserRouter>
    <Sidebar/>
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/add-book' element={<AddUser/>}/>
        <Route path='/edit-book/:id' element={<EditUser/>}/>
        <Route path='*' element={<Navigate to='/dashboard'/>}/>
      </Routes>
    </BrowserRouter>
  </div>
}

export default App