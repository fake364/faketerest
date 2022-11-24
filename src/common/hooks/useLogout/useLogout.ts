import axios from 'axios';
import { setWipeState } from '../../../redux/actions/metadata/actions';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const useLogout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return async () => {
    try {
      await axios.get('/api/logout');
    } finally {
      await router.push('/');
      dispatch(setWipeState());
    }
  };
};

export default useLogout;
