import { API } from 'Plugins/CommonUtils/Send/Serializable'
import {
    alertCallBack,
    backdropInitCallBack,
    InfoCallBackType,
    SimpleCallBackType,
} from 'Plugins/CommonUtils/Types/ToClusterMessage'
import { ToImageServiceMessage } from 'Plugins/CommonUtils/Types/ToClusterMessages/ToImageServiceMessage'

export abstract class ImageServiceMessage extends API {
    send(
        successCall: InfoCallBackType,
        failureCall: InfoCallBackType = alertCallBack,
        backdropCall: SimpleCallBackType | null = backdropInitCallBack
    ) {
        new ToImageServiceMessage(JSON.stringify(this)).send(
            successCall,
            failureCall,
            backdropCall,
            undefined,
            this.getRoute()
        )
    }
}
