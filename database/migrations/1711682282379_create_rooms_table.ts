import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'rooms'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('rm_no', 5).unique().notNullable()
      table.date('book_date')
      table.date('last_due_date')
      table.date('next_due_date')
      table.float('price', 10, 2)
      table.string('cycle_unit', 1)
      table.string('ccy', 3)
      table.string('stat', 1)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}