import { Serializable } from 'Plugins/CommonUtils/Send/Serializable'

export class SignUpInfo extends Serializable {
    constructor(
        public userName: string,
        public realName: string,
        public gender: string,
        public ID: string,
        public phoneNumber: string,
        public provinceFrom: string,
        public CEEScore: string,
        public CEERanking: string,
        public awards: string,
        public selfIntroduction: string,
        public examYear: string,
        public score: number,
        public isValid: boolean
    ) {
        super()
    }
}
