
import {
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

import { BasicEntity } from '../../common/entities/basic.entity';

@Entity({ schema: 'archive', name: 'email' })

export class LogEmailEntity extends BasicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uid : string

  @Column()
  file_name : string

  @Column()
  language : string

  @Column()
  data : string



}
