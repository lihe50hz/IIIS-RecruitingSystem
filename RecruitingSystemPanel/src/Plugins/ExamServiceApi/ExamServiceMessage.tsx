import { API } from 'Plugins/CommonUtils/Send/Serializable'
import {
    alertCallBack,
    backdropInitCallBack,
    InfoCallBackType,
    SimpleCallBackType,
} from 'Plugins/CommonUtils/Types/ToClusterMessage'
import { ToExamServiceMessage } from 'Plugins/CommonUtils/Types/ToClusterMessages/ToExamServiceMessage'

export abstract class ExamServiceMessage extends API {
    send(
        successCall: InfoCallBackType,
        failureCall: InfoCallBackType = alertCallBack,
        backdropCall: SimpleCallBackType | null = backdropInitCallBack
    ) {
        new ToExamServiceMessage(JSON.stringify(this)).send(
            successCall,
            failureCall,
            backdropCall,
            undefined,
            this.getRoute()
        )
    }
}
