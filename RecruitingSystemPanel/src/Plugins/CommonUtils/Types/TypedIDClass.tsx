import { Serializable } from 'Plugins/CommonUtils/Send/Serializable'

export abstract class TypedIDClass extends Serializable {
    v: number

    constructor(v: number) {
        super()
        this.v = v
    }
}
