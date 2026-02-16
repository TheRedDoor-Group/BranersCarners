import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Reservation } from "./reservation";

@Entity("units")
export class Unit {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  slug: string; // Ex: unit-mooca

  @Column()
  address: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: "jsonb", nullable: true, name: "opening_hours" })
  openingHours: object;

  @OneToMany(() => Reservation, (reservation) => reservation.unit)
  reservations: Reservation[];

  @Column({ nullable: true, name: "gmaps_link" })
  gmapsLink: string; // Ex: https://goo.gl/maps/xxxx

  @Column({ nullable: true, name: "whatsapp_link" })
  whatsappLink: string; // Ex: https://api.whatsapp.com/send?phone=5511999999999

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @CreateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
