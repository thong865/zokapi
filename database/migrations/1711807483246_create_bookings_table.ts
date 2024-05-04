import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bookings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('istype',2)
      table.string('book_ref',50).unique().notNullable()
      table.string('cust_no',20).notNullable()
      table.string('rm_no',5).notNullable()
      table.date('book_date')
      table.datetime('last_pay_date')
      table.float('last_amount_pay',10,2)
      table.float('total_val',10,2)
      table.string('ccy',3)
      table.float('frezen_amount',10,2)
      table.string('frezen_ccy',3)
      table.string('maker',20)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}