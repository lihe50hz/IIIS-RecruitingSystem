import { Serializable } from 'Plugins/CommonUtils/Send/Serializable'
import { ProblemAnswer } from 'Plugins/ExamServiceShared/ProblemAnswer'

export class ExamAnswer extends Serializable {
    constructor(
        public index: number,
        public userName: string,
        public paperIndex: number,
        public examName: string,
        public examYear: string,
        public answers: ProblemAnswer[],
        public score: number
    ) {
        super()
    }
}
