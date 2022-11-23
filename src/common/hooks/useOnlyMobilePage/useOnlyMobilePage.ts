import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { mobileCheck } from '../../utils/mobileCheck/mobileCheck';

const useOnlyMobilePage = () => {
  const router = useRouter();
  useEffect(() => {
    if (!mobileCheck()) {
      router.replace('/');
    }
  }, []);
};

export default useOnlyMobilePage;
