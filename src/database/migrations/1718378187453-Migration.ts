import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1718378187453 implements MigrationInterface {
  name = 'Migration1718378187453';

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (let i = 0; i < 1000000; i++) {
      await queryRunner.query(
        `INSERT INTO "user" ("firstName", "lastName", "age", "gender", "hasProblems") VALUES ($1, $2, $3, $4, $5)`,
        [
          `FirstName${i}`,
          `LastName${i}`,
          Math.floor(Math.random() * 100),
          ['male', 'female'][Math.floor(Math.random() * 2)],
          Math.random() < 0.5,
        ],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "user"
        `);
  }
}
