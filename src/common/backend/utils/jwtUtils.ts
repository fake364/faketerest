import jwt from 'jsonwebtoken';

export const generateJWT = (email: string, regDate: string) =>
  jwt.sign({ email, regDate }, process.env.SECRET, {
    algorithm: 'HS256',
    expiresIn: '2 days'
  });
