import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from './profile.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: String, nullable: false })
  full_name: string;

  @Column({ type: String, unique: true })
  email: string;

  @Column({ type: String })
  password: string;

  @OneToMany(() => Profile, (p) => p.user, { eager: true })
  profiles: Profile[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
