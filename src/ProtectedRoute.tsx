import { Navigate } from 'react-router-dom';


interface ProtectedRouteProps {
  element: React.ReactNode;
}

export default function ProtectedRoute({ element }: ProtectedRouteProps) {

  if (sessionStorage.getItem('token') || localStorage.getItem('token')) {
    return <Navigate to="/" />;
  }

  return <>{element}</>;
}

export function ProtectedRoute2({ element }: ProtectedRouteProps) {


  if (!sessionStorage.getItem('token') && !localStorage.getItem('token')) {
    return <Navigate to="/login" />;

  }

  return <>{element}</>;
}
