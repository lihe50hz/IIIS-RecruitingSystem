import { UserServiceMessage } from './UserServiceMessage'

export class queryUserInfo extends UserServiceMessage {
    constructor(public userName: string) {
        super()
    }
}
