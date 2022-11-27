import { createHandler, Get, Req } from 'next-api-decorators';
import { WithSessionAuth } from '../../checkSession';
import UserSessionsService from '../../../../src/common/backend/services/usersSessionsService/UserSessionsService';
import type { NextApiRequest } from 'next';
import { AUTH_SESSION_KEY } from '../../../../src/common/constants/commons';
import NotificationsService from '../../../../src/common/backend/services/notificationsService/NotificationsService';
import { getParticipantsIdsFromKeys } from '../../../../src/common/backend/utils/message/messageUtils';
import MessageUtils from 'faketerest-utilities/dist/events/message/messageUtils';
import MessagePayload from 'faketerest-utilities/dist/events/message/type';

class DialogsHandler {
  @Get()
  @WithSessionAuth()
  async getDialogs(@Req() req: NextApiRequest) {
    const sessionId = req.cookies[AUTH_SESSION_KEY];
    console.log('TEST',sessionId);
    const myId = await UserSessionsService.getUserIdBySessionUUid(sessionId);
    const dialogsKeys = await NotificationsService.getUsersDialogs(myId);
    const participantsIds = getParticipantsIdsFromKeys(dialogsKeys, myId);
    const participantsStatusMap: { [key: number]: MessagePayload[] } = {};
    for (const participantId of participantsIds) {
      participantsStatusMap[participantId] =
        await NotificationsService.getUnreadMessagesFromRoom(
          MessageUtils.createConversationId(myId, participantId),
          myId
        );
    }
    return participantsStatusMap;
  }
}

export default createHandler(DialogsHandler);
