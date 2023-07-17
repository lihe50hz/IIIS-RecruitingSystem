import { ExamServiceMessage } from 'Plugins/ExamServiceApi/ExamServiceMessage'
import { SimpleExamPaper } from '../ExamPaperServiceShared/SimpleExamPaper'

export class addExam extends ExamServiceMessage {
    constructor(public examPaper: SimpleExamPaper, public startTime: number) {
        super()
    }
}
