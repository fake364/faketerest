import { ConnectionService } from '../Connection';
import { Nullable } from '../../../types/common';
import UserDataEntity from '../../validation-services/registration/UserDataEntity';
import userQueryWithCountry from '../../sql/userQueryWithCountry';
import selectUsersByString from './queries/selectUsersByString';
import { areSearchUsersEntries } from './utils/utils';
import { SearchUserPayload } from './types/types';
import selectUserIdByUsername from './queries/selectUserIdByUsername';
import countEmail from './queries/countEmail';

export class RegService extends ConnectionService {
  public static instance: RegService;

  constructor() {
    super();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new RegService();
    }
    return this.instance;
  }

  public async getUserDataBy(
    usernameOrId: string | number
  ): Promise<Nullable<UserDataEntity>> {
    const userId = Number(usernameOrId);
    await this.checkConnection();

    const result = await this.connection.query(
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
      countryCode3: instance.ISO3,
      id: Number(instance.ID)
    };
  }

  getUsersByStringEntry = async (entry: string) => {
    const [res] = await this.connection.query(selectUsersByString(entry));
    if (!areSearchUsersEntries(res)) {
      throw new Error('some entry was wrong');
    }
    return res.map((entry) => ({
      id: Number(entry.ID),
      fullText: entry.full_text
    })) as SearchUserPayload[];
  };

  async getUserIdByUsername(username: string) {
    const [[res]] = await this.connection.query(
      selectUserIdByUsername(username)
    );
    const id = Number((res as { id: string }).id);
    return isNaN(id) ? null : id;
  }

  async isEmailExists(email: string) {
    const formattedEmail = email.trim().toLowerCase();
    try {
      const [[res]] = await this.connection.query(countEmail(formattedEmail));
      return (res as { count: string })?.count === '1';
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

const RegistrationService = RegService.getInstance();

export default RegistrationService;
