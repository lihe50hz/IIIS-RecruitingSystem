import { SignUpServiceMessage } from 'Plugins/SignUpServiceApi/SignUpServiceMessage'
import { SignUpInfo } from 'Plugins/SignUpServiceShared/SignUpInfo'

export class writeInfo extends SignUpServiceMessage {
    constructor(
        /*
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
		public examName: string,
		public examPassed: boolean,
		public interviewPassed: boolean,
		public score: number,
		public isValid: boolean,*/
        public signUpInfo: SignUpInfo
    ) {
        super()
    }
}
