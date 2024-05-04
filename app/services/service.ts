import WaterService from "./water_service.js";
interface Payload {
    billno: string
}
export default class ProviderServices {
    static async inquiry(srv_id: string, payload: Payload) {
        try {
            let result;
            switch (srv_id) {
                case 'WATER-INQ':
                    result = await WaterService.getCurrent(payload?.billno)
                    break;
                case 'ELECT-INQ':
                    result = '';
                    break;
                default:
                    result = '';
                    break;
            }
            return result
        } catch (error) {
            return error;
        }
    }
}