import { createHandler, Get } from 'next-api-decorators';
import NotificationsService from '../../../src/common/backend/services/notificationsService/NotificationsService';

class TestHandler {
  @Get()
  async getKek() {
    await NotificationsService.getKek();
  }
}

export default createHandler(TestHandler);
