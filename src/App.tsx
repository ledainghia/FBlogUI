import { Route, Routes } from 'react-router-dom';
import ProtectedRoute, { ProtectedRoute2 } from './ProtectedRoute'; // Import as a default export
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import WritePost from './pages/WritePost';
import Error from './pages/Error';
import BlogSingle from './pages/BlogSingle';

// import Test from './pages/Test';



function App() {

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
          path='*' element={<Error />}
        />
        <Route path="/blog/:idPost" element={<BlogSingle />} />
        <Route
          path='/profile/:userID'

          element={<ProtectedRoute2 element={<Profile />} />}
        />
      </Routes>
    </>
  );
}

export default App;
