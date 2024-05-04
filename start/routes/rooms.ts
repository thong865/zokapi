
import router from '@adonisjs/core/services/router'
const BooksController = () => import('#controllers/books_controller')
const RoomsController = () => import('#controllers/rooms_controller')
router.group(()=> {
    router.get('/room/:rm_no/detail', [RoomsController,'getDetailRoom'])
    router.get('/rooms', [RoomsController,'listRooms'])
    router.post('/room', [RoomsController,'storeRoom'])

    // Booking
    router.post('/room/booking',[BooksController,'roomBooking'])


    
    router.post('/roombkcurr/:rm_no',[BooksController,'getCustomerBooking'])
    router.get('/booking/invoice',[BooksController,'getInvoiceDetail'])
    // router.get('/services',[RoomsController,'getService'])
}).prefix('api/v1')

