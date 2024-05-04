import router from '@adonisjs/core/services/router'
const UsersController = () => import('#controllers/users/users_controller')
router.group(()=> {
    router.post('/login', [UsersController,'loginUser'])
    router.post('/register', [UsersController,'storeUser'])
}).prefix('api/v1')

