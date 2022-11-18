import { AnyAction } from 'redux';
import MessagePayload from 'faketerest-utilities/dist/events/message/type';
import {
  ADD_MESSAGE_FOR,
  ASSIGN_USER_FOR_MAP,
  CLEAR_MESSAGES_BY_ID,
  SET_MESSAGES_MAP,
  SET_USER_MAP
} from '../../actions/messages/actions';
import UserDataEntity from '../../../common/backend/validation-services/registration/UserDataEntity';

export type MessagesMap = {
  [userId: number]: MessagePayload[];
};

export type RecipientsMap = {
  [userId: number]: UserDataEntity;
};

type MessagesState = { messagesMap: MessagesMap; usersMap: RecipientsMap };

const initialState: MessagesState = {
  messagesMap: {},
  usersMap: {}
};

export default function messagesReducer(
  state = initialState,
  action: AnyAction
) {
  switch (action.type) {
    case ADD_MESSAGE_FOR:
      const newMap = { ...state.messagesMap };
      const message = action.payload as MessagePayload;
      if (!newMap[message.authorId]) {
        newMap[message.authorId] = [];
      }
      newMap[message.authorId].push(action.payload.message);
      return { ...state, messagesMap: newMap };
    case CLEAR_MESSAGES_BY_ID:
      const clearFromId: number = action.payload;
      return {
        ...state,
        messagesMap: { ...state.messagesMap, [clearFromId]: [] }
      };
    case ASSIGN_USER_FOR_MAP:
      const user = action.payload as UserDataEntity;
      return { ...state, usersMap: { ...state.usersMap, [user.id]: user } };
    case SET_USER_MAP:
      return { ...state, usersMap: action.payload };
    case SET_MESSAGES_MAP:
      return { ...state, messagesMap: action.payload };
    default:
      return state;
  }
}
