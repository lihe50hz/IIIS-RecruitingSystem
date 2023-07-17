import { UserServiceMessage } from './UserServiceMessage'

export class verify extends UserServiceMessage {
    constructor(public userName: string, public userType: string) {
        super()
    }
}
