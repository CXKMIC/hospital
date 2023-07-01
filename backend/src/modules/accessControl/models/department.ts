import { Model, Table, Column, DataType, ForeignKey } from "sequelize-typescript";

@Table
export default class Department extends Model {
  department_id!: number;
  department_name!: string;
  department_description!: string;
  // other properties...
}