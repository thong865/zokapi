import { DateTime } from 'luxon'
import { BaseModel, afterCreate, column } from '@adonisjs/lucid/orm'
import Booking from './booking.js'

export default class BookingInvoice extends BaseModel {
  public static table ='booking_invoices'
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare bookId:string
  @column()
  declare invId:string
  @column()
  declare rmNo:string
  @column()
  declare csNo:string
  @column()
  declare invDate:string
  @column()
  declare srCode:string
  @column()
  declare srUnit:number
  @column()
  declare srPrice:number
  @column()
  declare ccy:string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @afterCreate()
  static async bookRoomf(bk: BookingInvoice) {
    const res = await BookingInvoice.query().sum('sr_price').where('rm_no',bk.$attributes.rmNo).andWhere('inv_id',bk.$attributes.invId || '').andWhere('book_id',bk.$attributes.bookId).first()
    // await Customer.query().where('cs_no',bk.$attributes.csNo).update({total_val: res?.$extras.sum})
    await Booking.query().where('custNo',bk.$attributes.csNo).update({total_val: res?.$extras.sum})
    
  }

}