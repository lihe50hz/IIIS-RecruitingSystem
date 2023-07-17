import { UserServiceMessage } from './UserServiceMessage'

export class getVerification extends UserServiceMessage {
    constructor(public email: string) {
        super()
    }
}
