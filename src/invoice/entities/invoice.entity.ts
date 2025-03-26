import { Appointment } from 'src/appointment/entities/appointment.entity';
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
  OneToMany,
} from 'typeorm';

export enum PaymentMethod {
  CASH = 'cash',
  TRANSFER = 'transfer',
}

@Entity({ name: 'invoices' })
export class Invoice {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: String, nullable: true })
  card: string;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.TRANSFER,
    name: 'payment_method',
  })
  paymentMethod: PaymentMethod;

  @ManyToOne(() => Profile, (p) => p.appointments)
  @JoinColumn({ name: 'client_id' })
  profile: Profile;

  @ManyToOne(() => Service, (s) => s.appointments)
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @OneToMany(() => Appointment, (a) => a.invoice)
  appointments: Appointment[];

  @Column({ type: 'timestamp with time zone', name: 'paid_at' })
  paidAt: Date | null;

  @Column({ type: Number, name: 'amount_paid' })
  amountPaid: number;

  @Column({
    type: 'timestamp with time zone',
    name: 'refunded_at',
    nullable: true,
  })
  refundedAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
