import User from '#models/user'
import { loginUserValidator, storeUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
export default class UsersController {
/**
     * @summary Lorem ipsum dolor sit amet
     * @requestBody {"login_type": "xxxxxx","username":"String","password":"String"}
     */
    public async loginUser({ request, response }: HttpContext) {
        try {
            // validate
            const payload = await loginUserValidator.validate(request.all())
            const userAuth = await User.verifyCredentials(payload.username, payload.password);
            const token = await User.accessTokens.create(userAuth)
            return response.status(200).json(token)
        } catch (error) {
            return response.status(error.status).json(error)
        }
    }

    public async storeUser({ request, response }: HttpContext) {
        try {
            // validate
            const payload = await storeUserValidator.validate(request.all())

            delete payload?.reg_type
            const user = User.create(payload)
            return response.status(200).json({
                message: user
            })
        } catch (error) {
            return response.status(error.status).json(error)
        }


    }
}