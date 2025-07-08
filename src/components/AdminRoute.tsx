import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface AdminRouteProps {
  children: ReactNode;
}

// Simple admin check - in real app this would check actual authentication
const AdminRoute = ({ children }: AdminRouteProps) => {
  // Mock admin check - you can replace this with real authentication logic
  const isAdmin = () => {
    // Check localStorage for admin status (demo purposes)
    const userType = localStorage.getItem('userType');
    return userType === 'admin';
  };

  if (!isAdmin()) {
    // Redirect to login if not admin
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;