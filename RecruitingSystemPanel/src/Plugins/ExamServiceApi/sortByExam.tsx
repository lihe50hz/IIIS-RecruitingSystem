import { ExamServiceMessage } from 'Plugins/ExamServiceApi/ExamServiceMessage'

export class sortByExam extends ExamServiceMessage {
    constructor(public examYear: string, public paperIndex: number) {
        super()
    }
}
