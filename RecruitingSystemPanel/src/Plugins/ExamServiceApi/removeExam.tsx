import { ExamServiceMessage } from 'Plugins/ExamServiceApi/ExamServiceMessage'

export class removeExam extends ExamServiceMessage {
    constructor(public paperIndex: number) {
        super()
    }
}
