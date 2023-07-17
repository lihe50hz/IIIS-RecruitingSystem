import { MessageServiceMessage } from 'Plugins/MessageServiceApi/MessageServiceMessage'

export class deleteMessage extends MessageServiceMessage {
    constructor(public userName: string, public userType: string, public mesRank: number) {
        super()
    }
}