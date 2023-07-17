import { API } from 'Plugins/CommonUtils/Send/Serializable'
import {
    alertCallBack,
    backdropInitCallBack,
    InfoCallBackType,
    SimpleCallBackType,
} from 'Plugins/CommonUtils/Types/ToClusterMessage'
import { ToMessageServiceMessage } from 'Plugins/CommonUtils/Types/ToClusterMessages/ToMessageServiceMessage'

export abstract class MessageServiceMessage extends API {
    send(
        successCall: InfoCallBackType,
        failureCall: InfoCallBackType = alertCallBack,
        backdropCall: SimpleCallBackType | null = backdropInitCallBack
    ) {
        new ToMessageServiceMessage(JSON.stringify(this)).send(
            successCall,
            failureCall,
            backdropCall,
            undefined,
            this.getRoute()
        )
    }
}