import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/types';
import { useEffect } from 'react';

const useOnlyNotAuthPage = () => {
  const router = useRouter();

  const isLoggedIn: boolean = useSelector(
    (state: RootState) => state.metadata.isLoggedIn
  );

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/');
    }
  }, [isLoggedIn]);
};

export default useOnlyNotAuthPage;
