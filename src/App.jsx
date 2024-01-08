import React, { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Class from "./components/Class";
import User from "./components/User";
import Query from "./components/Query";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";

function App() {

  return <div id="wrapper">
    <BrowserRouter>
    <Sidebar/>
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/add-user' element={<AddUser/>}/>
        <Route path='/edit-user/:id' element={<EditUser/>}/>
        <Route path='/class' element={<Class/>}/>
        <Route path='/user' element={<User/>}/>
        <Route path='/query' element={<Query/>}/>
        <Route path='*' element={<Navigate to='/dashboard'/>}/>
      </Routes>
    </BrowserRouter>
  </div>
}

export default App