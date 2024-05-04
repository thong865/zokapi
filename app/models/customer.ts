import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'

export default class Customer extends BaseModel {
  public static table = 'customers'
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare csNo:string
  @column({columnName:'rm_no'})
  declare roomno:string
  @column()
  declare mobile:string
  @column()
  declare firstname:string
  @column()
  declare lastname:string
  @column()
  declare isuser:boolean

  

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
   static async storeCustomer(cs: Customer) {
    const maxId = await Customer.query().max('id').first()
    let num = `${maxId?.$extras.max || 0 +1}`
    cs.csNo = num.padStart(7,'0');
  }
}