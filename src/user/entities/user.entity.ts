import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoomEntity } from '../../room/entities/room.entity';
import { RoomService } from '../../room/room.service';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @ManyToMany(() => RoomEntity, (r) => r.users, { onDelete: 'CASCADE' })
  @JoinTable({
    name: 'user_room',
  })
  rooms: RoomEntity[];
}
