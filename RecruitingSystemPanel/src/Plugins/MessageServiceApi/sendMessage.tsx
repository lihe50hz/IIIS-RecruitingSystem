import { MessageServiceMessage } from 'Plugins/MessageServiceApi/MessageServiceMessage'

export class sendMessage extends MessageServiceMessage {
    constructor(public userName: string, public userType: string, public mesRank: number) {
        super()
    }
}