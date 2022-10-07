import { Sequelize } from 'sequelize-typescript';
import * as pg from 'pg';
import Registration from '../models/Registration.model';

export class ConnectionService {
  public static instance: ConnectionService;
  protected _connection: Sequelize;

  constructor() {
    if (ConnectionService.instance) {
      return ConnectionService.instance;
    }
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
    ConnectionService.instance = this;
    this.connection.addModels([Registration]);
  }

  get connection(): Sequelize {
    return this._connection;
  }

  public async checkConnection() {
    await this._connection.authenticate();
    console.log('---DB CONNECTION OPENED---');
  }
}

const Connection = new ConnectionService();

export default Connection;
