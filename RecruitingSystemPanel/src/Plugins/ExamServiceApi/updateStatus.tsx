import { ExamServiceMessage } from 'Plugins/ExamServiceApi/ExamServiceMessage'
import { StudentScore } from '../ExamServiceShared/StudentScore'

export class updateStatus extends ExamServiceMessage {
    constructor(public score: StudentScore) {
        super()
    }
}
