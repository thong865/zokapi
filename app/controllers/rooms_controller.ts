import Room from '#models/room'
import { storeRoomValidator } from '#validators/room'
import type { HttpContext } from '@adonisjs/core/http'

export default class RoomsController {
    async storeRoom({ request, response }: HttpContext) {
        try {
            const payload = await storeRoomValidator.validate(request.all())
            const roomService = payload.services
            delete payload?.services;
            const room = await Room.create(payload)
            room.related('services').createMany(roomService);
            return response.status(200).json(room)
        } catch (error) {
            console.log(error)
            return error
        }

    }


    async listRooms({ response }: HttpContext) {
        try {
            const rooms = await Room.query().preload('services').orderBy('rm_no')
            return response.status(200).json({
                errno: response.getStatus(),
                message: 'QUERY_SUCCESS',
                data: rooms
            })
        } catch (error) {
            console.log(error)
            return error
        }

    }

    async getDetailRoom({ params, response }: HttpContext) {
        try {
            const room = await Room.query().preload('services', (q) => {
                q.select('id', 'rm_no', 'sr_code', 'sr_title', 'sr_bill_no', 'sr_bill_date')
            }).preload('booking', (q) => {
                q.select('*').preload('customers').where('istype', 'BK')
            }).where('rm_no', params.rm_no).first()
            return response.status(200).json({
                errno: response.getStatus(),
                message: 'QUERY_SUCCESS',
                data: room
            })
        } catch (error) {
            return error
        }

    }

    // async getService({ request, params, response }: HttpContext) {
    //     try {
    //         const services = await RoomAsset.query()


    //     } catch (error) {
    //         console.log(error)
    //         return error
    //     }

    // }
}