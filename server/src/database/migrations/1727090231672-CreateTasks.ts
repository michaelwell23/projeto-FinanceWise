import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTasks1727090231672 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tasks',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'urgency',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'importance',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'userId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'commitmentId',
            type: 'int',
            isNullable: true,
          },
        ],
      })
    );

    // Chave estrangeira para 'users'
    await queryRunner.createForeignKey(
      'tasks',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      })
    );

    // Chave estrangeira opcional para 'commitments'
    await queryRunner.createForeignKey(
      'tasks',
      new TableForeignKey({
        columnNames: ['commitmentId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'commitments',
        onDelete: 'SET NULL',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tasks');
  }
}
