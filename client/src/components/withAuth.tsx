import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/utility/getCurrentUser';

const withAuth = (WrappedComponent: React.FC) => {
  return (props: any) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const user = await getCurrentUser();
        if (user) {
          setIsAuthenticated(true);
        } else {
          router.push('/login');
        }
        setLoading(false);
      };
      checkAuth();
    }, [router]);

    if (loading) {
      return <div>Loading...</div>; // You can replace this with a loading spinner
    }

    if (!isAuthenticated) {
      return null; // Or a redirect component
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
