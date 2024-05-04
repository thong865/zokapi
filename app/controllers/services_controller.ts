import ProviderServices from '#services/service'
import type { HttpContext } from '@adonisjs/core/http'

export default class ServicesController {
    async getService({ params, request, response }: HttpContext) {
        try {
            const { bilno } = request.all()
            const result = await ProviderServices.inquiry(params.srv_id, { billno: bilno })
            return response.status(200).json({
                errno: response.getStatus(),
                message: 'QUERY SCCUESS',
                data: result
            })
        } catch (error) {
            console.log(error)
            return error
        }

    }
}