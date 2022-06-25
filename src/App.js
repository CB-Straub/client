import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import './App.css';

//react-toastify alert hipness
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddEditPost from './pages/AddEditPost';
import Post from './pages/Post';
import Dashboard from './pages/Dashboard';

//components
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

//redux
import { setUser } from './redux/features/authSlice';



function App() {

  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile')) //fetching user from local storage for persist functionality
  //persist user will fire upon every refresh
  useEffect(() => {
    dispatch(setUser(user))
  }, [user, dispatch])
  
  return (
    <BrowserRouter>
       <div className="App">
         <Header/>
          <ToastContainer />
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>

              <Route path='/addPost' element={
                  <ProtectedRoute>
                    <AddEditPost/>
                  </ProtectedRoute>}/>

              <Route path='/editPost/:id' element={
                  <ProtectedRoute>
                    <AddEditPost/>
                  </ProtectedRoute>}/>

              <Route path='/post/:id' element={<Post/>}/>

              <Route path='/dashboard' element={
                <ProtectedRoute>
                    <Dashboard/>
                </ProtectedRoute>
               }/>
              
           </Routes>
      </div>
     </BrowserRouter>
    
  );
}

export default App;
