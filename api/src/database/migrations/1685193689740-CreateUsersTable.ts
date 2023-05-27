import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1685193689740 implements MigrationInterface {
    name = 'CreateUsersTable1685193689740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`emailAddress\` varchar(255) NOT NULL, \`passwordHash\` varchar(255) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_0a15e52405edda3ea73124ab40\` (\`emailAddress\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_0a15e52405edda3ea73124ab40\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
