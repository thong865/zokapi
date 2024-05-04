/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import AutoSwagger from "adonis-autoswagger";
import swagger from "#config/swagger";
import router from '@adonisjs/core/services/router'
import './routes/users.js'
import './routes/rooms.js'
import './routes/services.js'

router.get("/swagger", async () => {
    return AutoSwagger.default.docs(router.toJSON(), swagger);
});
router.get("/docs", async () => {
    return AutoSwagger.default.ui("/swagger", swagger);
    // return AutoSwagger.default.scalar("/swagger", swagger); to use Scalar instead
    // return AutoSwagger.default.rapidoc("/swagger", swagger); to use RapiDoc instead
});