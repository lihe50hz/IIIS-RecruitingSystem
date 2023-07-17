import { ImageServiceMessage } from 'Plugins/ImageServiceApi/ImageServiceMessage'

export class deleteImage extends ImageServiceMessage {
    constructor(public userName: string, public userType: string, public imageRank: string) {
        super()
    }
}
