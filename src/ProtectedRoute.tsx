import { Navigate } from 'react-router-dom';
import { useUserStore } from './store/store';

interface ProtectedRouteProps {
  element: React.ReactNode;
}

export default function ProtectedRoute({ element }: ProtectedRouteProps) {
  const { user } = useUserStore();

  if (user) {
    return <Navigate to="/" />;
  }

  return <>{element}</>;
}
