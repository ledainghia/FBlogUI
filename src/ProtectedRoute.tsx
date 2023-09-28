import { Navigate } from 'react-router-dom';
import { useUserGGStore, useUserStore } from './store/store';

interface ProtectedRouteProps {
  element: React.ReactNode;
}

export default function ProtectedRoute({ element }: ProtectedRouteProps) {
  const { user } = useUserStore();
  const { userGG } = useUserGGStore();
  if (user && userGG) {
    return <Navigate to="/" />;
  }

  return <>{element}</>;
}

export function ProtectedRoute2({ element }: ProtectedRouteProps) {
  const { user } = useUserStore();

  if (!user) {
    return <Navigate to="/login" />;

  }

  return <>{element}</>;
}
