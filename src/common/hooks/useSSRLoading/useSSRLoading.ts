import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useSSRLoading = () => {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState<boolean>(false);

  useEffect(() => {
    let timeout;
    const handleStart = () => {
      timeout = setTimeout(() => {
        setPageLoading(true);
      }, 1000);
    };
    const handleComplete = () => {
      clearTimeout(timeout);
      timeout = null;
      setPageLoading(false);
    };
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);

  return pageLoading;
};

export default useSSRLoading;
