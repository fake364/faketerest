import { createAndAssignSession } from '../utils';

describe('utils', () => {
  it('should clear token in cookies if we dont provide userId', () => {
    const spy = jest.fn((str: string, payload: string) => {});
    createAndAssignSession({ setHeader: spy });
    expect(spy).toHaveBeenCalledWith(
      'Set-Cookie',
      'auth-token=; Path=/; HttpOnly'
    );
  });

  it('should setup token if user id is provided', () => {
    jest.spyOn(Date, 'now').mockImplementation(() => 1466424490000);

    const spy = jest.fn((str: string, payload: string) => {});
    process.env.SECRET = 'secret';

    createAndAssignSession({ setHeader: spy }, 1);
    expect(spy).toHaveBeenCalledWith(
      'Set-Cookie',
      'auth-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTQ2NjQyNDQ5MCwiZXhwIjoxNDY2NTk3MjkwfQ.SqXCLALw9Ai7zn5vldtALNffX40dRiM3ToU1Sfy9D4s; Path=/; HttpOnly'
    );
  });
});
