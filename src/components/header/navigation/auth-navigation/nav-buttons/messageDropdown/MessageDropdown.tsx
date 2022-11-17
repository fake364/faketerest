import React, {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import DropdownRootElement from '../../../../../../common/components/buttons/buttonDropdown/DropdownRootElement';
import { FaCommentDots } from '@react-icons/all-files/fa/FaCommentDots';
import style from './MessageDropdown.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/types';
import axios from 'axios';
import UserDataEntity from '../../../../../../common/backend/validation-services/registration/UserDataEntity';
import clsx from 'clsx';
import getFirstLastName from '../../../../../../common/utils/firstLastNameCreate/getFirstLastName';
import UserAvatarImage from '../user-button/user-image/UserAvatarImage';
import ButtonDropdownElement from '../../../../../../common/components/buttons/buttonDropdown/ButtonDropdownElement';
import ChatWindow from './chatWindow/ChatWindow';
import CommonInput from '../../../../../../common/components/inputs/commonInput/CommonInput';
import { SearchUserPayload } from '../../../../../../common/backend/services/registrationService/types/types';
import debounce from 'lodash/debounce';
import ChatLoading from './chatWindow/loadingScreen/ChatLoading';

type Props = {};

const MessageDropdown: React.FC<Props> = () => {
  const myId: number = useSelector((state: RootState) => state.metadata.userId);
  const [usersObjects, setUsers] = useState<UserDataEntity[]>();
  const [selectedUser, selectUser] = useState<UserDataEntity>();
  const initialDialogsRef = useRef<UserDataEntity[]>([]);
  const [areUsersLoading, setLoading] = useState<boolean>(false);

  const fetchDialogs = async () => {
    const { data } = await axios.get<number[]>('/api/messages/dialogs');
    initialDialogsRef.current = await fetchUserIds(data);
  };

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

  useEffect(() => {
    fetchDialogs();
  }, [selectedUser]);

  const onCloseDropdown = () => {
    selectUser(undefined);
  };

  const onBackChatWindow = () => {
    selectUser(undefined);
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
      setUsers(initialDialogsRef.current);
    }
  };
  const debouncedChangeHandler = useCallback(debounce(onChangeSearch, 800), []);

  return (
    <DropdownRootElement
      variant={'icon'}
      Icon={FaCommentDots}
      className="px-[12px]"
      onClick={null}
      dropdownClass={style.dropdownContainer}
      buttonClass={'!text-[22px]'}
      tooltipText={'Messages'}
      onClose={onCloseDropdown}
    >
      <div className={clsx(style.dropdownBody)}>
        <div>
          <CommonInput
            placeholder={'Find user by name or username'}
            onChange={debouncedChangeHandler}
          />
        </div>
        {selectedUser && (
          <ChatWindow
            firstName={selectedUser.firstName}
            className={'absolute w-full h-full left-0 top-0 bg-white z-[15]'}
            onBack={onBackChatWindow}
            participantId={selectedUser.id}
          />
        )}

        {areUsersLoading ? (
          <ChatLoading />
        ) : (
          usersObjects?.map((user) => (
            <ButtonDropdownElement
              onClick={() => {
                selectUser(user);
              }}
            >
              <div className="flex items-center gap-[12px]">
                <UserAvatarImage
                  userId={user.id}
                  firstName={user.firstName}
                  className={'w-[50px] h-[50px]'}
                />
                <div>{getFirstLastName(user.firstName, user.lastName)}</div>
              </div>
            </ButtonDropdownElement>
          ))
        )}
      </div>
    </DropdownRootElement>
  );
};

export default MessageDropdown;
