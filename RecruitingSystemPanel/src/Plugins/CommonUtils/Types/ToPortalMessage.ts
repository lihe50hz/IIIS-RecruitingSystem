import { ToClusterMessage } from 'Plugins/CommonUtils/Types/ToClusterMessage'
import { RecruitingSystemPortalMessage } from 'Plugins/CommonUtils/Types/ToPortalMessages/RecruitingSystemPortalMessage'
import { Message } from 'Plugins/CommonUtils/Send/Serializable'

export enum ToPortalType {
    toRecruitingSystemPortal = 'toRecruitingSystemPortal',
}

export function toPortalMessage(toClusterMessage: ToClusterMessage, toPortal: ToPortalType): Message {
    switch (toPortal) {
        case ToPortalType.toRecruitingSystemPortal:
            return new RecruitingSystemPortalMessage(toClusterMessage)
    }
}
