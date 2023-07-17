import { ExamPaperServiceMessage } from 'Plugins/ExamPaperServiceApi/ExamPaperServiceMessage'

export class removeExamPaper extends ExamPaperServiceMessage {
    constructor(public index: number) {
        super()
    }
}
