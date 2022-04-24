import { Sequelize } from 'sequelize-typescript';
import config from '../../../../config/.env.dev.json';
import Registration from '../models/Registration.model';

class RegistrationService {
  public static instance: RegistrationService;
  private _connection: Sequelize;

  private constructor() {
    this._connection = new Sequelize(
      `postgres://${config.username}:${config.password}@${config.host}/${config.username}`,
      { models: [__dirname + '/**/*.model.ts'] }
    );
    RegistrationService.instance = this;
    this.connection.addModels([Registration]);
  }

  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    return new RegistrationService();
  }

  get connection(): Sequelize {
    return this._connection;
  }

  public async checkConnection() {
    await this._connection.authenticate();
  }

  public async closeConnection() {
    await this._connection.close();
  }
}

const RegService = RegistrationService.getInstance();

export default RegService;
