import { ExamPaperServiceMessage } from 'Plugins/ExamPaperServiceApi/ExamPaperServiceMessage'

export class getExamPaper extends ExamPaperServiceMessage {
    constructor(public index: number) {
        super()
    }
}
