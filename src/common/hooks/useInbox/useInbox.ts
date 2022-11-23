import { ChangeEventHandler, useState } from 'react';
import UserDataEntity from '../../backend/validation-services/registration/UserDataEntity';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/types';
import axios from 'axios';
import { SearchUserPayload } from '../../backend/services/registrationService/types/types';

const useInbox = () => {
  const [searchedUsers, setUsers] = useState<UserDataEntity[]>([]);
  const [selectedUser, selectUser] = useState<UserDataEntity>();
  const [areUsersLoading, setLoading] = useState<boolean>(false);
  const messagesState = useSelector((state: RootState) => state.messages);

  const fetchUserIds = async (ids: number[]) => {
    setLoading(true);
    const usersResponses = await Promise.all(
      ids.map((id) => axios.get('/api/registration/' + id))
    );
    const mapped = usersResponses.map((response) => response.data);
    setLoading(false);
    setUsers(mapped);
    return mapped;
  };

  const onChangeSearch: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const value = e.target.value.trim();
    if (value) {
      const { data } = await axios.get<SearchUserPayload[]>(
        '/api/registration/search',
        {
          params: { text: value }
        }
      );
      const ids = data.map(({ id }) => id);
      await fetchUserIds(ids);
    } else {
      setUsers([]);
    }
  };

  const displayedUsers: UserDataEntity[] =
    searchedUsers.length > 0
      ? searchedUsers
      : Object.values(messagesState.usersMap);

  return {
    displayedUsers,
    onChangeSearch,
    selectedUser,
    selectUser,
    areUsersLoading
  };
};

export default useInbox;
