import { Route, Routes } from "react-router-dom";
import ProtectedRoute, { ProtectedRoute2 } from "./ProtectedRoute"; // Import as a default export
import "./assets/scss/Theme.scss";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import WritePost from "./pages/WritePost";
import Error from "./pages/Error";
import BlogSingle from "./pages/BlogSingle";
import User from "./pages/User";
import MyWall from "./components/UserProfile/ComponentsUser/MyWall";
import UserManager from "./components/UserProfile/ComponentsUser/UserManager";

// import Test from './pages/Test';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<ProtectedRoute element={<Login />} />} />
        <Route path="/" element={<Home />} />

        <Route
          path="/writepost"
          element={<ProtectedRoute2 element={<WritePost />} />}
        />
        <Route
          path="/user/mywall"
          element={
            <ProtectedRoute2
              element={<User content={<MyWall></MyWall>}></User>}
            ></ProtectedRoute2>
          }
        />
        <Route
          path="/admin/usermanager"
          element={
            <ProtectedRoute2
              element={<User content={<UserManager></UserManager>}></User>}
            ></ProtectedRoute2>
          }
        />

        <Route path="*" element={<Error />} />
        <Route path="/blog/:idPost" element={<BlogSingle />} />

        <Route
          path="/profile/:userID"
          element={<ProtectedRoute2 element={<Profile />} />}
        />
      </Routes>
    </>
  );
}

export default App;
