import { Serializable } from 'Plugins/CommonUtils/Send/Serializable'

export class Image extends Serializable {
    constructor(public imageRank: string, public imageURL: string, public imageDate: string) {
        super()
    }
}
