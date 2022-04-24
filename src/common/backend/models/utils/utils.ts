import { RegInstanceType } from '../Registration.model';

export const isRegistrationEntity = (
  regInstance: unknown
): regInstance is RegInstanceType => {
  const isObject = typeof regInstance === 'object';
  if (isObject) {
    const reg = regInstance as RegInstanceType;
    const hasEmail = typeof reg.email === 'string';
    const hasUsername = typeof reg.username === 'string';
    const hasPass = typeof reg.passwordHash === 'string';
    return hasEmail && hasUsername && hasPass;
  }
  return false;
};
