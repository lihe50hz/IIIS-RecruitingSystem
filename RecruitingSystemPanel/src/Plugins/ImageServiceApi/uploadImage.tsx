import { ImageServiceMessage } from 'Plugins/ImageServiceApi/ImageServiceMessage'

export class uploadImage extends ImageServiceMessage {
    constructor(public userName: string, public userType: string, public imageContent: string) {
        super()
    }
}
