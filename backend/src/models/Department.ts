// 科室
import { Model, Table, Column, DataType, ForeignKey, PrimaryKey, AllowNull, HasMany } from "sequelize-typescript";
import Office from "./Office";

@Table
class Department extends Model {
  @PrimaryKey
  @Column(DataType.BIGINT)
  department_id!: bigint;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  department_name!: string;

  @Column(DataType.TEXT)
  department_description!: string;

  @HasMany(() => Office)
  offices!: Office[];
}

export default Department;