import { Message } from "Plugins/CommonUtils/Send/Serializable";
import { ToClusterMessage } from "Plugins/CommonUtils/Types/ToClusterMessage";

// import {getTokenSnap} from 'Plugins/UserAccountAPI/Stores/UserInfoStore';

export class ToPortalMessage extends Message {
    toClusterMessage: ToClusterMessage
    userToken: string

    constructor(toClusterMessage: ToClusterMessage) {
        super()
        this.toClusterMessage = toClusterMessage
        this.userToken = getDataFromLocalStorage('userToken') || ''
    }
}

// 从本地存储中读取userToken
const getDataFromLocalStorage = (key: string): any | null => {
    const data = localStorage.getItem(key)
    if (data) {
        return JSON.parse(data)
    }
    return null
}
