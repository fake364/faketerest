import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  setIsLoggedIn,
  setUserId,
  setWipeState
} from '../../redux/actions/metadata/actions';
import { AppDispatch } from '../../redux/types';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

export const useCheckAuth = () => {
  const [isCheckingAuth, setCheckAuth] = useState<boolean>(true);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    axios
      .get('/api/checkSession')
      .then((res) => {
        if (res.status === 200) {
          dispatch(setIsLoggedIn(true));
          dispatch(setUserId(res.data.userId));
          setCheckAuth(false);
        }
      })
      .catch((e) => {
        setCheckAuth(false);
        // router.push('/').then(() => dispatch(setWipeState()));
      });
  }, []);

  return { isCheckingAuth, setCheckAuth };
};
