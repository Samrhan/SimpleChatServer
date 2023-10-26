import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { RoomEntity } from '../../room/entities/room.entity';

@Entity()
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'fk_user' })
  user: UserEntity;

  @ManyToOne(() => RoomEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fk_room' })
  room: RoomEntity;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
