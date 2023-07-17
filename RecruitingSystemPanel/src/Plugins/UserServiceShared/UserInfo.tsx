import { Serializable } from 'Plugins/CommonUtils/Send/Serializable'

export class UserInfo extends Serializable {
    constructor(public userName: string, public password: string, public email: string, public userType: string) {
        super()
    }
}
