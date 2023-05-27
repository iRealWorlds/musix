import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateArtistsTable1685214796462 implements MigrationInterface {
    name = 'CreateArtistsTable1685214796462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`artists\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`createdAt\` datetime NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`artists\` ADD CONSTRAINT \`FK_f7bd9114dc2849a90d39512911b\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`artists\` DROP FOREIGN KEY \`FK_f7bd9114dc2849a90d39512911b\``);
        await queryRunner.query(`DROP TABLE \`artists\``);
    }

}
