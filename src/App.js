import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux';

//react-toastify alert hipness
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
//components
import Header from './components/Header';

import './App.css';
import { setUser } from './redux/features/authSlice';

function App() {

  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile')) //fetching user from local storage for persist functionality
  //persist user will fire upon every refresh
  useEffect(() => {
    dispatch(setUser(user))
  },)
  
  
  
  return (
    <BrowserRouter>
       <div className="App">
         <Header/>
          <ToastContainer />
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
           </Routes>
      </div>
     </BrowserRouter>
    
  );
}

export default App;
