import { SignUpServiceMessage } from 'Plugins/SignUpServiceApi/SignUpServiceMessage'

export class queryInfo extends SignUpServiceMessage {
    constructor(public userName: string) {
        super()
    }
}
