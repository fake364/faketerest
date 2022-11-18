import MessagePayload from 'faketerest-utilities/dist/events/message/type';
import { Dispatch } from 'redux';
import axios, { AxiosResponse } from 'axios';
import UserDataEntity from '../../../common/backend/validation-services/registration/UserDataEntity';
import { RootState } from '../../types';
import {
  MessagesMap,
  RecipientsMap
} from '../../reducers/messages/messageReducer';

export const ADD_MESSAGE_FOR = 'ADD_MESSAGE_FOR';
export const CLEAR_MESSAGES_BY_ID = 'CLEAR_MESSAGES_BY_ID';
export const ASSIGN_USER_FOR_MAP = 'ASSIGN_USER_FOR_MAP';
export const SET_USER_MAP = 'SET_USER_MAP';
export const SET_MESSAGES_MAP = 'SET_MESSAGES_MAP';

export const safeAddMessageFor =
  (message: MessagePayload) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const usersMap = getState().messages.usersMap;
    if (!usersMap[message.authorId]) {
      const res: AxiosResponse<UserDataEntity> = await axios.get(
        'api/registration/' + message.authorId
      );
      dispatch(assignUserToMap(res.data));
    }
    dispatch(addMessageFor(message));
  };

export const addMessageFor = (message: MessagePayload) => ({
  type: ADD_MESSAGE_FOR,
  payload: message
});

export const clearMessageIds = (fromId: number) => ({
  type: CLEAR_MESSAGES_BY_ID,
  payload: fromId
});

export const assignUserToMap = (user: UserDataEntity) => ({
  type: ASSIGN_USER_FOR_MAP,
  payload: user
});

export const setMessagesMap = (messageMap: MessagesMap) => ({
  type: SET_MESSAGES_MAP,
  payload: messageMap
});

export const setUsersMap = (usersMap: RecipientsMap) => ({
  type: SET_USER_MAP,
  payload: usersMap
});
