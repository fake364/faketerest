import { Sequelize } from 'sequelize-typescript';
import Registration from '../models/Registration.model';

class RegistrationService {
  public static instance: RegistrationService;
  private _connection: Sequelize;

  private constructor() {
    this._connection = new Sequelize(
      `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_USERNAME}`,
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
    console.log('---DB CONNECTION OPENED---');
  }

  public async closeConnection() {
    await this._connection.close();
    console.log('---DB CONNECTION CLOSED---');
  }
}

const RegService = RegistrationService.getInstance();

export default RegService;
