import { SignUpServiceMessage } from 'Plugins/SignUpServiceApi/SignUpServiceMessage'

export class queryInfoByExam extends SignUpServiceMessage {
    constructor(public examName: string) {
        super()
    }
}
