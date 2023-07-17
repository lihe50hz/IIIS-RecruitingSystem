import { MessageServiceMessage } from 'Plugins/MessageServiceApi/MessageServiceMessage'

export class editMessage extends MessageServiceMessage {
    constructor(
        public userName: string,
        public userType: string,
        public mesRank: string,
        public mesContent: string,
        public mesTitle: string,
        public tarName: string,
        public mesStatus: string,
        public mesType: string
    ) {
        super()
    }
}