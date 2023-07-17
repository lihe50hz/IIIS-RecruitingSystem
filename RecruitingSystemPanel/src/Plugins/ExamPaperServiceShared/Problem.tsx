import { Serializable } from 'Plugins/CommonUtils/Send/Serializable'

export class Problem extends Serializable {
    constructor(
        public problemType: string,
        public description: string,
        public image: string,
        public choiceCnt: number
    ) {
        super()
    }
}
