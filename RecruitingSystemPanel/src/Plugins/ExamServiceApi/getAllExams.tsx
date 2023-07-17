import { ExamServiceMessage } from 'Plugins/ExamServiceApi/ExamServiceMessage'

export class getAllExams extends ExamServiceMessage {
    constructor(public examYear: string) {
        super()
    }
}
