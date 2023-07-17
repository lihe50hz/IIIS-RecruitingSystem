import { UserServiceMessage } from './UserServiceMessage'

export class resetPassword extends UserServiceMessage {
    constructor(public email: string, public verify: string, public newPassword: string) {
        super()
    }
}
