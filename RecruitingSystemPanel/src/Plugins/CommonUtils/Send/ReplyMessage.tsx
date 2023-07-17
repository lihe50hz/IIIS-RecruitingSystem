export class ReplyMessage {
    status: number
    info: string
    uuid: string

    constructor(status: number, info: string, uuid: string) {
        this.status = status
        this.info = info
        this.uuid = uuid
    }
}
