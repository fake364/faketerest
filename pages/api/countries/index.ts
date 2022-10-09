import { createHandler, Get, Query, Res } from 'next-api-decorators';
import type { NextApiResponse } from 'next';
import CountriesService from '../../../src/common/backend/services/countriesService/CountriesService';
import { StatusCodes } from 'http-status-codes';

class CountriesHandler {
  @Get()
  async getCountries(
    @Res() res: NextApiResponse,
    @Query('locale') locale?: string
  ) {
    try {
      return await CountriesService.getAvailableCountriesList(locale);
    } catch (e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: e });
    }
  }
}

export default createHandler(CountriesHandler);
