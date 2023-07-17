import { UserServiceMessage } from './UserServiceMessage'
import { UserInfo } from '../UserServiceShared/UserInfo'

export class teacherRegister extends UserServiceMessage {
    constructor(public info: UserInfo, public token: string) {
        super()
    }
}
