import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';

export const generateJWT = (email: string, regDate: string) =>
  jwt.sign({ email, regDate }, CryptoJS.SHA256(process.env.SECRET).toString(), {
    algorithm: 'HS256',
    expiresIn: '2 days'
  });
