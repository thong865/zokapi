import axios from "axios";

export default class WaterService {
    static async getToken() {
        ///http://stpay.stbanklaos.la:9888/v/auth/login

        try {
            const resultToken = await axios.post(`http://stpay.stbanklaos.la:9888/v/auth/login`, { username: 'laithong', password: 'Sbs@1010' });
            return resultToken.data?.token
        } catch (error) {
            return error
        }

    }

    static async getCurrent(billno: string) {
        try {
            let result;
            const token = await this.getToken()
            const water = await axios.get(`http://stpay.stbanklaos.la:9888/v/biller/water/detail/${billno}`, {
                headers: {
                    "Authorization": 'Bearer ' + token
                }
            });
            if (water.status == 200) {
                result = Object.assign(water.data?.message?.data, { detail: water.data?.message?.detail })
            } else {
                result = 'ERROR'
            }
            return result
        } catch (error) {
            return error
        }

    }
    static async getHistory() {
        // services.filter((t) => t.$attributes.sr_code == 'WATER').forEach(async (e) => {
        //     const water = await axios.get(`http://stpay.stbanklaos.la:9888/v/biller/water/detail/${e.$attributes.sr_bill_no}`, {
        //         headers: {
        //             "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJsYWl0aG9uZyIsImlhdCI6MTcxMjExMzQ1NSwiZXhwIjoxNzEyMTE4NDU1fQ.LjJ5vtTlBrrTUIHaCNUH57krjqFsB6eOfzZJTYxyvsY'
        //         }
        //     })
        //     await RoomAsset.query().where('id',e.$attributes.id).update({bill_amt_deb:water.data?.message.detail?.data.length,sr_bill_curdeb:water.data?.message.data?.TOTAL_DEBT,bill_name:water.data?.message.data?.CLIENT_NAME})
        // })
    }
}