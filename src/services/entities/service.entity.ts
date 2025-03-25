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
import { Profile } from '../../user/entities/profile.entity';
import { Appointment } from 'src/appointment/entities/appointment.entity';

@Entity({ name: 'services' })
export class Service {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: String, length: 255 })
  name: string;

  @Column({ type: Boolean, default: false, name: 'is_refundable' })
  isRefundable: boolean;

  @Column({ type: Number, default: 0 })
  price: number;

  @ManyToOne(() => Profile, (p) => p.services)
  @JoinColumn({ name: 'provider_id' })
  profile: Profile;

  @OneToMany(() => Appointment, (a) => a.service)
  appointments: Appointment[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
