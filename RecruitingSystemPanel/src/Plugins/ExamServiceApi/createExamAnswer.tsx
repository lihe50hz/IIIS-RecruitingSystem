import { ExamServiceMessage } from 'Plugins/ExamServiceApi/ExamServiceMessage'
import { ExamAnswer } from '../ExamServiceShared/ExamAnswer'

export class createExamAnswer extends ExamServiceMessage {
    constructor(public answer: ExamAnswer) {
        super()
    }
}
