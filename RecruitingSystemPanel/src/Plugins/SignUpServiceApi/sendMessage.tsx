import { SignUpServiceMessage } from 'Plugins/SignUpServiceApi/SignUpServiceMessage'

export class sendMessage extends SignUpServiceMessage {
    constructor(public email: string, public realName: string, public messageType: number, public result: boolean) {
        super()
    }
}
