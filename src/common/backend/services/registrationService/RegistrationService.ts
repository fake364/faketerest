import Connection, { ConnectionService } from '../Connection';
import { Nullable } from '../../../types/common';
import UserDataEntity from '../../validation-services/registration/UserDataEntity';
import userQueryWithCountry from '../../sql/userQueryWithCountry';

export class RegService extends ConnectionService {
  public static instance: RegService;

  constructor() {
    super();
    if (RegService.instance) {
      return RegService.instance;
    }
  }

  public async getUserDataBy(
    usernameOrId: string | number
  ): Promise<Nullable<UserDataEntity>> {
    const userId = Number(usernameOrId);
    await this.checkConnection();

    const result = await Connection.connection.query(
      userQueryWithCountry(isNaN(userId) ? usernameOrId : userId)
    );
    if (result[0].length !== 1) {
      return null;
    }

    const instance: any = result[0][0];

    return {
      email: instance.EMAIL,
      firstName: instance.FIRST_NAME,
      lastName: instance.LAST_NAME,
      username: instance.USERNAME,
      gender: instance.GENDER,
      age: instance.AGE,
      country: instance.label,
      countryCode3: instance.ISO3
    };
  }
}

const RegistrationService = new RegService();

export default RegistrationService;