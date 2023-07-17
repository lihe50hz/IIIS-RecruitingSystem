import { ExamPaperServiceMessage } from 'Plugins/ExamPaperServiceApi/ExamPaperServiceMessage'
import { ExamPaper } from 'Plugins/ExamPaperServiceShared/ExamPaper'

export class rewriteExamPaper extends ExamPaperServiceMessage {
    constructor(public index: number, public paper: ExamPaper) {
        super()
    }
}
