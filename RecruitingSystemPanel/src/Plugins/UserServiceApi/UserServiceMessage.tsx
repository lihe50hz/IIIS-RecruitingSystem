import { API } from '../CommonUtils/Send/Serializable'
import {
    alertCallBack,
    backdropInitCallBack,
    InfoCallBackType,
    SimpleCallBackType,
} from 'Plugins/CommonUtils/Types/ToClusterMessage'
import { ToUserServiceMessage } from 'Plugins/CommonUtils/Types/ToClusterMessages/ToUserServiceMessage'

export abstract class UserServiceMessage extends API {
    send(
        successCall: InfoCallBackType,
        failureCall: InfoCallBackType = alertCallBack,
        backdropCall: SimpleCallBackType | null = backdropInitCallBack
    ) {
        new ToUserServiceMessage(JSON.stringify(this)).send(
            successCall,
            failureCall,
            backdropCall,
            undefined,
            this.getRoute()
        )
    }
}
