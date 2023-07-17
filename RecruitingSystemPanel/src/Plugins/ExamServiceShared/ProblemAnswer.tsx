import { Serializable } from 'Plugins/CommonUtils/Send/Serializable'
import { Problem } from 'Plugins/ExamPaperServiceShared/Problem'

export class ProblemAnswer extends Serializable {
    constructor(
        public problem: Problem,
        public studentChoice: string,
        public studentAnswer: string,
        public studentImage: string,
        public score: number
    ) {
        super()
    }
}
