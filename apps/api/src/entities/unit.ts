import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({ nullable: true, name: "gmaps_link" })
    gmapsLink: string; // Ex: https://goo.gl/maps/xxxx

    @Column({ nullable: true, name: "whatsapp_link" })
    whatsappLink: string; // Ex: https://api.whatsapp.com/send?phone=5511999999999

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @CreateDateColumn({ name: "updated_at" })
    updatedAt: Date;
}
