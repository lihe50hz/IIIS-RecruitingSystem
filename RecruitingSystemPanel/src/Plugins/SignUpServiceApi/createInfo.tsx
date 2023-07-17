import { SignUpServiceMessage } from 'Plugins/SignUpServiceApi/SignUpServiceMessage'

export class createInfo extends SignUpServiceMessage {
    constructor(public userName: string) {
        super()
    }
}
