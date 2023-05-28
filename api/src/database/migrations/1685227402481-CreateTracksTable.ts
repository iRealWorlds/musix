import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTracksTable1685227402481 implements MigrationInterface {
    name = 'CreateTracksTable1685227402481'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tracks\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`publishedAt\` datetime NOT NULL, \`createdAt\` datetime NOT NULL, \`artistId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tracks\` ADD CONSTRAINT \`FK_62f595181306916265849fced48\` FOREIGN KEY (\`artistId\`) REFERENCES \`artists\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tracks\` DROP FOREIGN KEY \`FK_62f595181306916265849fced48\``);
        await queryRunner.query(`DROP TABLE \`tracks\``);
    }

}
