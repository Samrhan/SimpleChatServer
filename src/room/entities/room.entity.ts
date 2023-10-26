import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity()
export class RoomEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_owner_fk' })
  owner: UserEntity;

  @ManyToMany(() => UserEntity, (u) => u.rooms, { onDelete: 'CASCADE' })
  users: UserEntity[];
}
