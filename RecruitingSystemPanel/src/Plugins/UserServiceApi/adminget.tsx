import { UserServiceMessage } from './UserServiceMessage'

export class adminget extends UserServiceMessage {
    constructor(public userType: string) {
        super()
    }
}
