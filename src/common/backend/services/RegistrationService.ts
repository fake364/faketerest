import { Sequelize } from 'sequelize-typescript';
import * as pg from 'pg';
import Registration from '../models/Registration.model';

class RegistrationService {
  public static instance: RegistrationService;
  private _connection: Sequelize;

  private constructor() {
    const sslConfig =
      process.env.ENVIRONMENT !== 'local'
        ? { ssl: { require: true, rejectUnauthorized: false } }
        : {};
    this._connection = new Sequelize(
      `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
      {
        models: [__dirname + '/**/*.model.ts'],
        dialect: pg,
        dialectOptions: {
          ...sslConfig
        }
      }
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

  public async getUserDataBy(usernameOrId: string | number) {
    await this.checkConnection();
    const condition = isNaN(Number(usernameOrId))
      ? { username: usernameOrId }
      : { id: usernameOrId };
    const instance = await Registration.findOne({
      where: { ...condition }
    });
    return {
      email: instance.getDataValue('email'),
      firstName: instance.getDataValue('firstName'),
      lastName: instance.getDataValue('lastName'),
      username: instance.getDataValue('username')
    };
  }
}

const RegService = RegistrationService.getInstance();

export default RegService;
