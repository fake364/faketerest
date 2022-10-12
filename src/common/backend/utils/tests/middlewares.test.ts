import { StatusCodes } from 'http-status-codes';
import { sessionMiddlewareFn, setDefaultMessageByCode } from '../middlewares';
import { AUTH_SESSION_KEY } from '../../../constants/commons';
import jwt from 'jsonwebtoken';

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

  describe('jwtMiddlewareFn', () => {
    it('should call next callback that is equivalent of guard success check', async () => {
      jest.spyOn(Date, 'now').mockImplementation(() => 1466424490000);
      process.env.SECRET = 'secret';
      const req = {
        cookies: {
          [AUTH_SESSION_KEY]: jwt.sign({ userId: 1 }, 'secret', {
            algorithm: 'HS256'
          })
        }
      };
      const spy = jest.fn();
      await sessionMiddlewareFn(req, {}, spy);
      expect(spy).toBeCalled();
    });

    it('should fail on invalid token and remove invalid token from cookies and set unauthorized code', async () => {
      jest
        .spyOn(jwt, 'verify')
        .mockReturnValue(Promise.reject('Invalid token'));
      const jsonSpy = jest.fn();
      const statusSpy = jest.fn(() => ({ json: jsonSpy }));
      const res = { setHeader: jest.fn(), status: statusSpy };
      await sessionMiddlewareFn(
        { cookies: { [AUTH_SESSION_KEY]: '1214' } },
        res,
        jest.fn()
      );
      expect(jsonSpy).toBeCalledWith({});
      expect(statusSpy).toBeCalledWith(StatusCodes.UNAUTHORIZED);
      expect(res.setHeader).toBeCalledWith(
        'Set-Cookie',
        'auth-token=; HttpOnly'
      );
    });
  });
});
