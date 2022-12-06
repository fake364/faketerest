import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

let timeout;
const useSSRLoading = () => {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleStart = (e) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setPageLoading(true);
      }, 1000);
    };
    const handleComplete = (e) => {
      clearTimeout(timeout);
      timeout = null;
      setPageLoading(false);
    };
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
    return () => {
      clearTimeout(timeout);
      timeout = null;
    };
  }, [router]);

  return pageLoading;
};

export default useSSRLoading;
