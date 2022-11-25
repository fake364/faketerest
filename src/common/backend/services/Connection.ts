import { Sequelize } from 'sequelize-typescript';
import * as pg from 'pg';
import Registration from '../models/Registration.model';

export class ConnectionService {
  public static instance: ConnectionService;
  protected _connection: Sequelize;

  static getInstance() {
    if (!this.instance) {
      this.instance = new ConnectionService();
    }
    return this.instance;
  }

  constructor() {
    const sslConfig =
      process.env.ENVIRONMENT !== 'local'
        ? { ssl: { require: true, rejectUnauthorized: false } }
        : {};
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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

const Connection = ConnectionService.getInstance();

export default Connection;
