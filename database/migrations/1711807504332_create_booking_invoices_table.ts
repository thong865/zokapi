import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'booking_invoices'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('book_id',50)
      table.string('inv_id',50)
      table.string('rm_no',5)
      table.string('cs_no',20)
      table.date('inv_date')
      table.string('sr_code',20)
      table.integer('sr_unit')
      table.float('sr_price',10,2)
      table.string('ccy',3)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}