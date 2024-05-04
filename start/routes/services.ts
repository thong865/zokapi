import router from '@adonisjs/core/services/router'
const ServicesController = () => import('#controllers/services_controller')
router.group(() => {
    router.get('/services/:srv_id', [ServicesController, 'getService'])
}).prefix('api/v1')

