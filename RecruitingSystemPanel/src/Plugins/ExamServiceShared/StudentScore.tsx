import { Serializable } from 'Plugins/CommonUtils/Send/Serializable'
import { ExamAnswer } from 'Plugins/ExamServiceShared/ExamAnswer'

export class StudentScore extends Serializable {
    constructor(
        public userName: string,
        public totalScore: number,
        public examYear: string,
        public examAnswers: ExamAnswer[],
        public specifiedScore: number,
        public examPassed: boolean,
        public interviewPassed: boolean
    ) {
        super()
    }
}
