import { ExamServiceMessage } from 'Plugins/ExamServiceApi/ExamServiceMessage'

export class removeExamAnswer extends ExamServiceMessage {
    constructor(public index: number) {
        super()
    }
}
