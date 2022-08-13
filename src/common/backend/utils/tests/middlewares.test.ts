import { StatusCodes } from 'http-status-codes';
import { setDefaultMessageByCode } from '../middlewares';

describe('middlewares', () => {
  describe('setDefaultMessageByCode', () => {
    it('should set json payload with appropriate default value for it', () => {
      const test = {
        status: jest.fn(function (code: StatusCodes) {
          this.code = code;
          return this;
        }),
        json: jest.fn(function (obj: any) {
          return obj;
        })
      };
      setDefaultMessageByCode(test, StatusCodes.BAD_REQUEST);
      expect(test.status).toBeCalledWith(StatusCodes.BAD_REQUEST);
      expect(test.json).toBeCalledWith({ error: 'Bad Request' });
    });
  });
});
