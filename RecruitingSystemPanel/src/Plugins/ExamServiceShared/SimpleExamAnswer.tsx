import { Serializable } from 'Plugins/CommonUtils/Send/Serializable'

export class SimpleExamAnswer extends Serializable {
    constructor(public index: number, public userName: string, public examName: string) {
        super()
    }
}
