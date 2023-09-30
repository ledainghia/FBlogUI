import { Route, Routes } from 'react-router-dom';
// import './App.css';
import ProtectedRoute, { ProtectedRoute2 } from './ProtectedRoute'; // Import as a default export
import Home from './pages/Home';
import Login from './pages/Login';
// import { useEffect } from 'react';
// import { useUserStore } from './store/store';
import { useEffect } from 'react';

import axiosInstance from './config/axiosConfig';
import Profile from './pages/Profile';
import WritePost from './pages/WritePost';
import { useUserStore } from './store/store';
// import Test from './pages/Test';

function App() {
  const { setUser } = useUserStore();


  // useEffect(() => {
  //   const userFromLocalStorage = localStorage.getItem('user');
  //   const userFromSessionStorage = sessionStorage.getItem('user');
  //   if (userFromLocalStorage) {
  //     const parsedUser = JSON.parse(userFromLocalStorage);
  //     setUser(parsedUser);
  //   } else {

  //     if (userFromSessionStorage) {
  //       const parsedUser = JSON.parse(userFromSessionStorage);
  //       setUser(parsedUser);
  //     }
  //   }


  //   if (userFromLocalStorage) {
  //     const tokenExpirationTime = JSON.parse(userFromLocalStorage).exp;
  //     const currentTime = Date.now() / 1000;
  //     if (tokenExpirationTime < currentTime) {
  //       handleLogout();
  //     }
  //   }

  //   if (userFromSessionStorage) {
  //     const tokenExpirationTime = JSON.parse(userFromSessionStorage).exp;

  //     const currentTime = Date.now() / 1000;
  //     if (tokenExpirationTime < currentTime) {
  //       handleLogout();
  //     }
  //   }

  // }, [setUser]);

  // const handleLogout = () => {
  //   setUser(null);
  //   localStorage.removeItem('user');
  //   sessionStorage.removeItem('user');
  //   navigate('/login');
  // };

  useEffect(() => {
    axiosInstance.get("/api/v1/auth/getUserInfo")
      .then(response => {
        console.log("userInfor", response);
        setUser(response.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [axiosInstance]);


  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={<ProtectedRoute element={<Login />} />}
        />
        <Route path="/" element={<Home />} />

        <Route
          path='/writepost'
          element={<ProtectedRoute2 element={<WritePost />} />}
        />
        <Route
          path='/profile'
          element={<ProtectedRoute2 element={<Profile />} />}
        />


      </Routes>
    </>
  );
}

export default App;
