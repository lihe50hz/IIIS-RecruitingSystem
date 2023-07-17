import { config } from 'Globals/Config'
import { Serializable } from '../Send/Serializable'
// import { materialAlert } from 'Gadgets/AlertGadget'
// import { openBackdropGadget } from 'Gadgets/BackdropGadget'
import { toPortalMessage } from 'Plugins/CommonUtils/Types/ToPortalMessage'
import { toPortal } from 'Globals/GlobalVariables'
import { commonSend } from '../Send/CommonSend'
import { ReplyMessage } from '../Send/ReplyMessage'

export type InfoCallBackType = (info: string) => void
export type ExtraCallBackType = (info: string, status: number) => void
export type SimpleCallBackType = () => void
export const alertCallBack = (info: string) => {
    console.log('alertCallBack', info)
}
export const backdropInitCallBack = () => {
    // openBackdropGadget()
}

export const extractReplyMessage =
    (successCall: InfoCallBackType, extraCall: ExtraCallBackType | null) => (info: string) => {
        const reply = JSON.parse(info) as ReplyMessage
        if (reply.status == 0) successCall(reply.info)
        else if (reply.status < 0) {
            // materialAlert(reply.info, 'error')
            // progressBarClosed()
        } else {
            if (extraCall) extraCall(reply.info, reply.status)
            else successCall(reply.info)
        }
    }

export abstract class ToClusterMessage extends Serializable {
    serializedInfo: string

    constructor(serializedInfo: string) {
        super()
        this.serializedInfo = serializedInfo
    }

    send(
        successCall: InfoCallBackType,
        failureCall: InfoCallBackType,
        backdropCall: SimpleCallBackType | null = backdropInitCallBack,
        timeout: number = 15000,
        route: string = '',
        timeoutCall: SimpleCallBackType | null = null,
        isEncrypt: boolean = true
    ): void {
        commonSend(
            `${config.hubURL}/api/${this.getServiceName()}/${route}`,
            // `${config.protocol ? config.protocol : 'http'}://${config.hubURL}/api/${this.getServiceName()}/${route}`,
            toPortalMessage(this, toPortal()),
            successCall,
            failureCall,
            backdropCall,
            timeoutCall,
            timeout,
            false,
            isEncrypt
        ).catch()
    }

    /** 获取后端微服务的名称 */
    getServiceName() {
        return this.type.replace('To', '').replace('Message', '')
    }
}
