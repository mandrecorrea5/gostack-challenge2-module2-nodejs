import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterTableTransactionsAlterFieldCreateAt1593570300127
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('transactions', 'create_at');
    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('transactions', 'created_at');
    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: 'create_at',
        type: 'timestamp',
        default: 'now()',
      }),
    );
  }
}
