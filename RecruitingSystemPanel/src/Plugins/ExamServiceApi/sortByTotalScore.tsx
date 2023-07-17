import { ExamServiceMessage } from 'Plugins/ExamServiceApi/ExamServiceMessage'

export class sortByTotalScore extends ExamServiceMessage {
    constructor(public examYear: string) {
        super()
    }
}
