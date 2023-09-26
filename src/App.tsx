import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import ProtectedRoute, { ProtectedRoute2 } from './ProtectedRoute'; // Import as a default export
import { useEffect } from 'react';
import { useUserStore } from './store/store';
import WritePost from './pages/WritePost';
import Profile from './pages/Profile';
// import Test from './pages/Test';

function App() {
  const { setUser } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem('user');
    const userFromSessionStorage = sessionStorage.getItem('user');
    if (userFromLocalStorage) {
      const parsedUser = JSON.parse(userFromLocalStorage);
      setUser(parsedUser);
    } else {

      if (userFromSessionStorage) {
        const parsedUser = JSON.parse(userFromSessionStorage);
        setUser(parsedUser);
      }
    }


    if (userFromLocalStorage) {
      const tokenExpirationTime = JSON.parse(userFromLocalStorage).exp;
      const currentTime = Date.now() / 1000;
      if (tokenExpirationTime < currentTime) {
        handleLogout();
      }
    }

    if (userFromSessionStorage) {
      const tokenExpirationTime = JSON.parse(userFromSessionStorage).exp;
      
      const currentTime = Date.now() / 1000;
      if (tokenExpirationTime < currentTime) {
        handleLogout();
      }
    }

  }, [setUser]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    navigate('/login');
  };


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
