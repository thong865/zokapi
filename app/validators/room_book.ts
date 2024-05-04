import vine from '@vinejs/vine'
import { exitsRule } from '../../rules/table_rule.js'

export const roomBookingValidator = vine.compile(
    vine.object({
        istype: vine.enum(['BK','BV']),
        personal: vine.object({
            firstname:vine.string().trim(),
            lastname:vine.string().trim(),
            mobile:vine.string().trim()
        }),
        rm_no: vine.string().use(exitsRule({table:'rooms',column:'rm_no'})),
        book_date: vine.date(),
        frezen_amount: vine.number(),
        frezen_ccy: vine.enum(['LAK','THB','USD'])
    })
)