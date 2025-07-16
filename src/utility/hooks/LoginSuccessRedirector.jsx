import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useUserRole from './useUserRole';


const LoginSuccessRedirector = () => {
  const { role, isLoading } = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && role) {
      if (role === 'admin') {
        navigate('/dashboard/manage-users');
      } else if (role === 'tour_guide') {
        navigate('/dashboard/my-assigned-tours');
      } else if (role === 'tourist') {
        navigate('/dashboard/my-bookings');
      } else {
        navigate('/'); // fallback
      }
    }
  }, [isLoading, role, navigate]);

  return null; // or a spinner if you want
};

export default LoginSuccessRedirector;
