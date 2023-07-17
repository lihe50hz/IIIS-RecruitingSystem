import { UserServiceMessage } from './UserServiceMessage'

export class register extends UserServiceMessage {
    constructor(public userName: string, public password: string, public email: string, public verify: string) {
        super()
    }
}
