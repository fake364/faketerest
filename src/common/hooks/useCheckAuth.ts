import { useEffect, useState } from 'react';
import axios from 'axios';
import { setIsLoggedIn, setUserId } from '../../redux/actions/metadata/actions';
import { AppDispatch } from '../../redux/types';
import { useDispatch } from 'react-redux';

export const useCheckAuth = () => {
  const [isCheckingAuth, setCheckAuth] = useState<boolean>(true);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    axios('/api/checkToken', { method: 'GET' })
      .then((res) => {
        if (res.status === 200) {
          dispatch(setIsLoggedIn(true));
          console.log(res.data);
          dispatch(setUserId(res.data.userId));
          setCheckAuth(false);
        }
      })
      .catch(() => {
        setCheckAuth(false);
      });
  }, []);

  return { isCheckingAuth, setCheckAuth };
};
