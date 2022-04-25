import { Column, DataType, Model, Table } from 'sequelize-typescript';

export type RegInstanceType = {
  id?: number;
  username: string;
  email: string;
  age?: number;
  regDate?: Date;
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
    type: DataType.CITEXT,
    allowNull: false,
    field: 'USERNAME'
  })
  username: string;

  @Column({
    field: 'EMAIL',
    type: DataType.CITEXT,
    allowNull: false,
    unique: true
  })
  email: string;

  @Column({ field: 'REG_DATE', allowNull: true, type: DataType.DATE })
  regDate: Date;

  @Column({ field: 'AGE', allowNull: true, type: DataType.NUMBER })
  age: number;
}