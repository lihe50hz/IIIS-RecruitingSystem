import { ImageServiceMessage } from 'Plugins/ImageServiceApi/ImageServiceMessage'

export class editImage extends ImageServiceMessage {
    constructor(
        public userName: string,
        public userType: string,
        public imageContent: string,
        public imageRank: string
    ) {
        super()
    }
}
