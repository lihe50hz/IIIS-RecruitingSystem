import { API } from 'Plugins/CommonUtils/Send/Serializable'
import {
    alertCallBack,
    backdropInitCallBack,
    InfoCallBackType,
    SimpleCallBackType,
} from 'Plugins/CommonUtils/Types/ToClusterMessage'
import { ToSignUpServiceMessage } from 'Plugins/CommonUtils/Types/ToClusterMessages/ToSignUpServiceMessage'

export abstract class SignUpServiceMessage extends API {
    send(
        successCall: InfoCallBackType,
        failureCall: InfoCallBackType = alertCallBack,
        backdropCall: SimpleCallBackType | null = backdropInitCallBack
    ) {
        new ToSignUpServiceMessage(JSON.stringify(this)).send(
            successCall,
            failureCall,
            backdropCall,
            undefined,
            this.getRoute()
        )
    }
}
