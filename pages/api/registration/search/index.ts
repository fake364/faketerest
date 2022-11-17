import { createHandler, Get, Query } from 'next-api-decorators';
import RegistrationService from '../../../../src/common/backend/services/registrationService/RegistrationService';

class SearchHandler {
  @Get()
  async searchUsers(@Query('text') text: string) {
    if (text) {
      return await RegistrationService.getUsersByStringEntry(text);
    }
    return [];
  }
}

export default createHandler(SearchHandler);
