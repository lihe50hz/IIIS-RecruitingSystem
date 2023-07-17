import { ExamServiceMessage } from 'Plugins/ExamServiceApi/ExamServiceMessage'

export class getAnswer extends ExamServiceMessage {
    constructor(public index: number) {
        super()
    }
}
