import { Serializable } from 'Plugins/CommonUtils/Send/Serializable'
import { Problem } from 'Plugins/ExamPaperServiceShared/Problem'

export class ExamPaper extends Serializable {
    constructor(
        public index: number,
        public title: string,
        public problemCnt: number,
        public examDuration: number,
        public examYear: string,
        public problems: Problem[]
    ) {
        super()
    }
}
