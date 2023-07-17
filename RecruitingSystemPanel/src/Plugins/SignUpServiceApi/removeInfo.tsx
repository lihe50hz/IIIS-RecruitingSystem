import { SignUpServiceMessage } from 'Plugins/SignUpServiceApi/SignUpServiceMessage'

export class removeInfo extends SignUpServiceMessage {
    constructor(public userName: string) {
        super()
    }
}
