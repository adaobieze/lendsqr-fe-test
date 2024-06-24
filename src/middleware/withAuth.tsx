import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/hooks/userStore';
import { getAuthToken } from '@/utils/api';

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter();
    const { isLoggedIn, setLoggedInFromToken } = useUserStore();

    useEffect(() => {
      const checkAuth = () => {
        const token = getAuthToken();
        if (token && !isLoggedIn) {
          setLoggedInFromToken();
        } else if (!token && !isLoggedIn) {
          router.replace('/login');
        }
      };

      checkAuth();
    }, [isLoggedIn, setLoggedInFromToken, router]);

    if (!isLoggedIn) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
