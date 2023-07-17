import { Serializable } from 'Plugins/CommonUtils/Send/Serializable'

export class Message extends Serializable {
    constructor(
        public mesTitle: string,
        public mesContent: string,
        public mesRank: number,
        public mesStatus: Array<string>,
        public mesType: string,
        public mesDate: string,
        public tarName: string
    ) {
        super()
    }
}