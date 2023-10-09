import { Route, Routes } from 'react-router-dom';
import ProtectedRoute, { ProtectedRoute2 } from './ProtectedRoute'; // Import as a default export
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import WritePost from './pages/WritePost';
import { useUserStore } from './store/store';
import { useEffect } from 'react';
import axiosInstance from './config/axiosConfig';
import BlogSingle from './pages/BlogSingle';
// import Test from './pages/Test';



function App() {
  const { setUser } = useUserStore();
  useEffect(() => {

    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/auth/getUserInfo");
        console.log("userInfo", response.data);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();


  }, [setUser]);
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
        <Route path="/blog/:idPost" element={<BlogSingle />} />
        <Route
          path='/profile'
          element={<ProtectedRoute2 element={<Profile />} />}
        />
      </Routes>
    </>
  );
}

export default App;
