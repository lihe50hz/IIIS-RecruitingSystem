import { initUUID, PlanUUID } from 'Plugins/CommonUtils/Send/PlanUUID'

export abstract class Message {}

export abstract class Serializable extends Message {
    public readonly type = this.getName()

    private getName() {
        return this.constructor.name
    }
}

export abstract class API extends Serializable {
    uuid: PlanUUID

    constructor() {
        super()
        this.uuid = initUUID()
    }

    /** 获取api路由，可overwrite */
    getRoute(): string {
        return this.type
    }
}
