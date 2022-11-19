import MessageUtils from 'faketerest-utilities/dist/events/message/messageUtils';

export const getParticipantsIdsFromKeys = (
  dialogsKeys: string[],
  myId: number
) =>
  dialogsKeys
    .map((dialogKey) => MessageUtils.getParticipants(dialogKey, myId))
    .flat();
