type LoginRequestBody = {
  email: string;
  password: string;
};

export const isLoginRequestBody = (obj: unknown): obj is LoginRequestBody => {
  const propNames = Object.getOwnPropertyNames(obj);
  if (propNames.includes('email') && propNames.includes('password')) {
    const body = obj as LoginRequestBody;
    return typeof body.email === 'string' && typeof body.password === 'string';
  }
  return false;
};
