import Booking from '#models/booking';
import BookingInvoice from '#models/booking_invoice';
import Customer from '#models/customer';
import Room from '#models/room';
import { roomBookingValidator } from '#validators/room_book'
import type { HttpContext } from '@adonisjs/core/http'
import moment from 'moment';

export default class BooksController {

    async roomBooking({ request, response }: HttpContext) {
        try {
            const payload = await roomBookingValidator.validate(request.all())
            let result;
            const payCustomer = payload.personal;
            delete payload?.personal;
            const roomItem = await Room.query().where('rm_no', payload.rm_no).first()
            if (roomItem?.$attributes.stat == 'O') {
                const customer = await Customer.updateOrCreate({ mobile: payCustomer.mobile, roomno: payload.rm_no }, payCustomer)
                const book = await Booking.create(Object.assign(payload, { cust_no: '001' }))
                book.related('invoice').createMany([
                    {
                        rmNo: payload.rm_no,
                        csNo: customer.$attributes.csNo,
                        srCode: 'RMP',
                        srUnit: 1,
                        invDate: moment().format('yyyy-MM-DD'),
                        srPrice: roomItem?.$attributes.price,
                        ccy: roomItem?.$attributes.ccy
                    },
                    {
                        rmNo: payload.rm_no,
                        csNo: customer.$attributes.csNo,
                        srCode: 'RMF',
                        srUnit: 1,
                        invDate: moment().format('yyyy-MM-DD'),
                        srPrice: payload.frezen_amount,
                        ccy: payload.frezen_ccy
                    }
                ])
                console.log(customer)
                result = {
                    errno: 200,
                    message: 'BOOK_SUCCESS',
                    data: book.$attributes?.bookRef
                }
            } else {
                result = {
                    errno: 200,
                    message: 'Created',
                    data: roomItem?.$attributes.stat
                }
            }

            return response.status(200).json(result);
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async getCustomerBooking({ params, response }: HttpContext) {
        try {
            const rsBook = await Booking.query().where('rm_no', params.rm_no).preload('customers',(qc)=> {
                qc.select('cs_no','mobile','firstname','lastname')
            }).andWhere('istype', 'BK').first()
            return response.status(200).json({
                errno: response.getStatus(),
                message: 'QUERY SCCUESS',
                data: rsBook || ''
            });
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async getInvoiceDetail({response }: HttpContext) {
        try {
            const Invoice = await BookingInvoice.query().first()
            return response.status(200).json({
                errno: response.getStatus(),
                message: 'QUERY SCCUESS',
                data: Invoice
            });
        } catch (error) {
            console.log(error)
            return error
        }
    }
}