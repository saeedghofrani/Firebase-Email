import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from "typeorm";

export class BasicEntity extends BaseEntity {


  @CreateDateColumn({
    update : false
  })
  created_at: string;

  @UpdateDateColumn()
  update_at: Date;

  @DeleteDateColumn()
  delete_at?: Date;


}