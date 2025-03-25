import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Service } from 'src/services/entities/service.entity';
import { Appointment } from 'src/appointment/entities/appointment.entity';

export enum Role {
  PROVIDER = 'provider',
  CLIENT = 'client',
}

@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, (user) => user.profiles)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Service, (s) => s.profile)
  services: Service[];

  @OneToMany(() => Appointment, (a) => a.profile)
  appointments: Appointment[];

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.PROVIDER,
  })
  role: Role;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
