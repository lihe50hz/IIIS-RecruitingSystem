import { ExamServiceMessage } from 'Plugins/ExamServiceApi/ExamServiceMessage'
import { ExamAnswer } from '../ExamServiceShared/ExamAnswer'

export class updateStudentScore extends ExamServiceMessage {
    constructor(public answer: ExamAnswer) {
        super()
    }
}
