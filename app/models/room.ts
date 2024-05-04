import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import RoomAsset from './room_asset.js';
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import moment from 'moment';
import Booking from './booking.js';

export default class Room extends BaseModel {
  public static table = 'rooms';
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare rm_no: string
  @column()
  declare book_date: DateTime
  @column()
  declare last_due_date: DateTime
  @column()
  declare next_due_date: DateTime
  @column()
  declare price: number
  @column()
  declare ccy: string
  @column()
  declare cycle_unit: string
  @column()
  declare stat: string

  @column.dateTime({
    autoCreate: true, consume: (val) => {
      return moment(val).format('yyyy-MM-DD hh:mm:ss')
    }
  })
  declare createdAt: DateTime

  @column.dateTime({
    autoCreate: true, autoUpdate: true, consume: (val) => {
      return moment(val).format('yyyy-MM-DD hh:mm:ss')
    }
  })
  declare updatedAt: DateTime


  @hasMany(() => RoomAsset, {
    localKey: 'rm_no',
    foreignKey: 'rm_no'
  })
  declare services: HasMany<typeof RoomAsset>

  @hasOne(() => Booking, {
    localKey: 'rm_no',
    foreignKey: 'rmNo'
  })
  declare booking: HasOne<typeof Booking>
}