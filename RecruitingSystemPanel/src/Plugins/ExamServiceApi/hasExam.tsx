import { ExamServiceMessage } from 'Plugins/ExamServiceApi/ExamServiceMessage'

export class hasExam extends ExamServiceMessage {
    constructor(public paperIndex: number) {
        super()
    }
}
