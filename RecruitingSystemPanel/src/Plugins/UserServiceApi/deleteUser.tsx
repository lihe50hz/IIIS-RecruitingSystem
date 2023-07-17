import { UserServiceMessage } from './UserServiceMessage'

export class deleteUser extends UserServiceMessage {
    constructor(public userName: string) {
        super()
    }
}
