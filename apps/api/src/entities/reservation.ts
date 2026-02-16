import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Unit } from "./unit";

export enum ReservationStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELED = "canceled",
  COMPLETED = "completed",
}

@Entity("reservations")
export class Reservation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "customer_name" })
  customerName: string;

  @Column({ name: "customer_email" })
  customerEmail: string;

  @Column({ name: "customer_phone" })
  customerPhone: string;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "timestamptz" })
  time: Date;

  @Column({ name: "people_count" })
  peopleCount: number;

  @Column({
    type: "enum",
    enum: ReservationStatus,
    default: ReservationStatus.PENDING,
  })
  status: ReservationStatus;

  @Column({ name: "unit_id" })
  unitId: string;

  @ManyToOne(() => Unit, (unit) => unit.reservations)
  @JoinColumn({ name: "unit_id" })
  unit: Unit;

  @Column({ name: "created_at" })
  createdAt: Date;

  @Column({ name: "updated_at" })
  updatedAt: Date;
}
