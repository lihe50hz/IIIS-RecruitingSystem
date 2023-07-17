import { ExamServiceMessage } from 'Plugins/ExamServiceApi/ExamServiceMessage'

export class sortByProblem extends ExamServiceMessage {
    constructor(public examYear: string, public paperIndex: number, public problemIndex: number) {
        super()
    }
}
