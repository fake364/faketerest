import { Column, DataType, Model, Table } from 'sequelize-typescript';

export type RegInstanceType = {
  id?: number;
  username: string;
  email: string;
  passwordHash: string;
  age?: number;
  regDate: Date;
};

@Table({ tableName: 'registrations', timestamps: false })
export default class Registration extends Model<RegInstanceType> {
  @Column({
    type: DataType.BIGINT,
    unique: true,
    allowNull: true,
    autoIncrement: true,
    primaryKey: true,
    field: 'ID'
  })
  id: number;

  @Column({
    unique: true,
    type: DataType.STRING,
    allowNull: false,
    field: 'USERNAME'
  })
  username: string;

  @Column({
    field: 'EMAIL',
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  email: string;

  @Column({ field: 'PASS_HASH', allowNull: false, type: DataType.STRING })
  passwordHash: string;

  @Column({ field: 'REG_DATE', allowNull: false, type: DataType.DATE })
  regDate: Date;

  @Column({ field: 'AGE', allowNull: true, type: DataType.NUMBER })
  age: number;
}
