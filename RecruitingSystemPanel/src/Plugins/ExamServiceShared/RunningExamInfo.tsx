import { Serializable } from 'Plugins/CommonUtils/Send/Serializable'

export class RunningExamInfo extends Serializable {
    constructor(
        public nowTime: number,
        public startTime: number,
        public endTime: number,
        public paperIndex: number,
        public examName: string,
        public examYear: string
    ) {
        super()
    }
}
