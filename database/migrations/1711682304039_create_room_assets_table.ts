import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'room_assets'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('rm_no', 5)
      table.string('sr_code', 10)
      table.string('sr_title', 50)
      table.string('sr_bill_no', 20)
      table.date('sr_bill_date')
      table.float('sr_bill_curdeb', 10, 2)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}