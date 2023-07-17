import { UserServiceMessage } from './UserServiceMessage'
import { UserInfo } from '../UserServiceShared/UserInfo'

export class studentRegister extends UserServiceMessage {
    constructor(public info: UserInfo) {
        super()
    }
}
