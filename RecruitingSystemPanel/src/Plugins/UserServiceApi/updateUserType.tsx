import { UserServiceMessage } from './UserServiceMessage'

export class updateUserType extends UserServiceMessage {
    constructor(public userName: string, public userType: string) {
        super()
    }
}
