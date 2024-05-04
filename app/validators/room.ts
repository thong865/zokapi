import vine from '@vinejs/vine'

export const storeRoomValidator = vine.compile(
    vine.object({
        rm_no: vine.string().trim(),
        price: vine.number(),
        ccy: vine.enum(['LAK']),
        cycle_unit: vine.enum(['Y', 'M', 'D']),
        stat: vine.enum(['O', 'V', 'C']),
        services: vine.array(
            vine.object({
                sr_code: vine.string().trim(),
                sr_bill_no: vine.string().trim()
            })
        )
    })
)