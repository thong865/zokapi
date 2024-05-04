import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class RoomAsset extends BaseModel {
  public static table = 'room_assets'
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare rm_no: number
  @column()
  declare sr_code: string
  @column()
  declare sr_title: string
  @column()
  declare bill_name: string
  @column()
  declare bill_amt_deb: string
  @column()
  declare sr_bill_no: string
  @column()
  declare sr_bill_date: DateTime
  @column()
  declare sr_bill_curdeb: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}