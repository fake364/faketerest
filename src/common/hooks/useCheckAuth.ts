import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  setIsLoggedIn,
  setUserId,
  setWipeState
} from '../../redux/actions/metadata/actions';
import { AppDispatch } from '../../redux/types';
import { useDispatch } from 'react-redux';
import { StatusCodes } from 'http-status-codes';

export const useCheckAuth = () => {
  const [isCheckingAuth, setCheckAuth] = useState<boolean>(true);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    axios
      .get('/api/checkToken')
      .then((res) => {
        if (res.status === 200) {
          dispatch(setIsLoggedIn(true));
          console.log(res.data);
          dispatch(setUserId(res.data.userId));
          setCheckAuth(false);
        }
      })
      .catch((e) => {
        setCheckAuth(false);
        if (e?.response?.status === StatusCodes.UNAUTHORIZED) {
          dispatch(setWipeState());
        }
      });
  }, []);

  return { isCheckingAuth, setCheckAuth };
};
