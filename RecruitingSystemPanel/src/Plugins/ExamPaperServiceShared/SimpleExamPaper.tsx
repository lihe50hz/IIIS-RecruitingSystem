import { Serializable } from 'Plugins/CommonUtils/Send/Serializable'

export class SimpleExamPaper extends Serializable {
    constructor(public index: number, public title: string, public examYear: string, public examDuration: number) {
        super()
    }
}
