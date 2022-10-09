import CryptoJS from 'crypto-js';

export const createPasswordHmac = (value: string) =>
  CryptoJS.HmacSHA256(value, process.env.PASS_SECRET).toString();
