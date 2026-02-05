import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUnitsTable1770315538651 implements MigrationInterface {
    name = 'CreateUnitsTable1770315538651'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "units" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "slug" character varying NOT NULL, "address" character varying NOT NULL, "phone" character varying, "gmaps_link" character varying, "whatsapp_link" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5a8f2f064919b587d93936cb223" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "units"`);
    }

}
