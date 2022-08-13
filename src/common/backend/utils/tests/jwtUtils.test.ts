import { generateJWT } from '../jwtUtils';
import jwt from 'jsonwebtoken';

describe('jwtUtils', () => {
  describe('generateJWT', () => {
    it('should create JWT with userId in payload', () => {
      jest.spyOn(Date, 'now').mockImplementation(() => 1466424490000);
      process.env.SECRET = 'secret';
      const jwtStr = generateJWT(1);
      expect(jwt.decode(jwtStr)).toStrictEqual({
        userId: 1,
        iat: 1466424490,
        exp: 1466597290
      });
    });
  });
});
