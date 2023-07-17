import { UserServiceMessage } from './UserServiceMessage'

export class login extends UserServiceMessage {
    constructor(public userName: string, public userPassword: string) {
        super()
    }
}
