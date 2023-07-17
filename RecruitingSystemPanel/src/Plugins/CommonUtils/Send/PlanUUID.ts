import { randomString } from 'Plugins/CommonUtils/Functions/StringUtils'

export class PlanUUID {
    id: string

    constructor(id: string) {
        this.id = id
    }
}

export function initUUID(): PlanUUID {
    return new PlanUUID(new Date().getTime().toString() + '_' + randomString(10))
}