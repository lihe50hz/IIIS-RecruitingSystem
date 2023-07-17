import { MessageServiceMessage } from 'Plugins/MessageServiceApi/MessageServiceMessage'

export class newMessage extends MessageServiceMessage {
    constructor(
        public userName: string,
        public userType: string,
        public mesContent: string,
        public mesTitle: string,
        public mesStatus: Array<string>,
        public mesType: string,
        public tarName: string
    ) {
        super()
    }
}