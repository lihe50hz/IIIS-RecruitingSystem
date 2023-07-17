import { ExamServiceMessage } from 'Plugins/ExamServiceApi/ExamServiceMessage'

export class getCurrentInfo extends ExamServiceMessage {
    constructor(public paperIndex: number) {
        super()
    }
}
