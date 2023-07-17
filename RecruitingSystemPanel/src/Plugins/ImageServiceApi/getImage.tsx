import { ImageServiceMessage } from 'Plugins/ImageServiceApi/ImageServiceMessage'

export class getImage extends ImageServiceMessage {
    constructor(public userName: string, public userType: string, public imageRank: string) {
        super()
    }
}
