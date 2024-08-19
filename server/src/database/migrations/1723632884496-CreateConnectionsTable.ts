import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateConnectionsTable1723632884496 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'connections',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user1Id',
            type: 'uuid',
          },
          {
            name: 'user2Id',
            type: 'uuid',
          },
          {
            name: 'user1Skill',
            type: 'varchar',
          },
          {
            name: 'user2Skill',
            type: 'varchar',
          },
          {
            name: 'user1TeachingDuration',
            type: 'int',
          },
          {
            name: 'user2TeachingDuration',
            type: 'int',
          },
          {
            name: 'user1Availability',
            type: 'varchar',
          },
          {
            name: 'user2Availability',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      'connections',
      new TableForeignKey({
        columnNames: ['user1Id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'connections',
      new TableForeignKey({
        columnNames: ['user2Id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('connections');
  }
}
