import { SignUpServiceMessage } from 'Plugins/SignUpServiceApi/SignUpServiceMessage'

export class hasInfo extends SignUpServiceMessage {
    constructor(public userName: string) {
        super()
    }
}
