import { MessageServiceMessage } from 'Plugins/MessageServiceApi/MessageServiceMessage'

export class refreshMessage extends MessageServiceMessage {
    constructor(public userName: string, public userType: string) {
        super()
    }
}