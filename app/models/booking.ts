import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import moment from 'moment'
import BookingInvoice from './booking_invoice.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Room from './room.js'
import Customer from './customer.js'

export default class Booking extends BaseModel {
  public static table = 'bookings'
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare istype: string
  @column()
  declare bookRef: string
  @column()
  declare custNo: string
  @column()
  declare rmNo: string
  @column()
  declare bookDate: DateTime
  @column()
  declare lastPayDate: DateTime
  @column()
  declare lastPayAmount: number
  @column()
  declare totalVal: number
  @column()
  declare ccy: string
  @column()
  declare frezenAmount: number
  @column()
  declare frezenCcy: string
  @column()
  declare maker: string


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async bookRoom(bk: Booking) {
    await Room.query().where('rm_no', bk.rmNo).update({ stat: 'V', book_date: bk.bookDate })
    bk.bookRef = moment().format('yyDDMMhhss')
  }

  @hasMany(() => BookingInvoice, {
    localKey: 'bookRef',
    foreignKey: 'bookId'
  })
  declare invoice: HasMany<typeof BookingInvoice>

  @hasMany(() => Customer, {
    localKey: 'rmNo',
    foreignKey: 'roomno'
  })
  declare customers: HasMany<typeof Customer>
}