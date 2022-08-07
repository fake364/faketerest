import jwt from 'jsonwebtoken';

export const generateJWT = (userId: number) =>
  jwt.sign({ userId }, process.env.SECRET, {
    algorithm: 'HS256',
    expiresIn: '2 days'
  });
