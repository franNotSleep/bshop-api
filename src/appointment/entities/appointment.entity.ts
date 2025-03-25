import { Invoice } from 'src/invoice/entities/invoice.entity';
import { Service } from 'src/services/entities/service.entity';
import { Profile } from 'src/user/entities/profile.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'appointments' })
export class Appointment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Profile, (p) => p.appointments)
  @JoinColumn({ name: 'client_id' })
  profile: Profile;

  @ManyToOne(() => Service, (s) => s.appointments)
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @ManyToOne(() => Invoice, (i) => i.appointments)
  @JoinColumn({ name: 'invoice_id' })
  invoice: Invoice;

  @Column({
    type: 'timestamp with time zone',
    name: 'confirmed_at',
    nullable: true,
  })
  confirmedAt: Date | null;

  @Column({ type: 'timestamp with time zone', name: 'starts_at' })
  startsAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
