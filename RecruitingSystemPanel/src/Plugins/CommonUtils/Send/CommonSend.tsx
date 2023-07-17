import { Message } from 'Plugins/CommonUtils/Send/Serializable'
// import { closeAlert, materialAlert } from 'Plugins/CommonUtils/Gadgets/AlertGadget'
// import { closeBackdropGadget } from 'Plugins/CommonUtils/Gadgets/BackdropGadget'
import { alertCallBack, InfoCallBackType, SimpleCallBackType } from 'Plugins/CommonUtils/Types/ToClusterMessage'
import { getNextTestMessage } from 'Plugins/CommonUtils/Send/MockTest'
import { sendMessage } from 'Plugins/CommonUtils/Send/SendMessage'
// import { setToken, setUserInfo, UserInfo } from 'Plugins/UserAccountAPI/Stores/UserInfoStore'
import { getAutoRedirectTimerSnap, setAutoRedirectTimer } from 'Plugins/CommonUtils/Store/CommonSendStore'

export async function commonSend(
    url: string,
    message: Message,
    successCall: InfoCallBackType,
    failureCall: InfoCallBackType = alertCallBack,
    backdropCall: null | SimpleCallBackType = null,
    timeoutCall: null | SimpleCallBackType = null,
    timeout: number = 10000,
    mock: boolean = false,
    isEncrypt: boolean = true // 是否加密，可以从message力度控制
): Promise<void> {
    if (backdropCall) {
        backdropCall()
    }

    const clearTokenTimeOut = () => {
        const timer = setTimeout(() => {
            // closeAlert()
            // setToken('')
            // setUserInfo(new UserInfo())
            setAutoRedirectTimer(null)
        }, 3000)
        setAutoRedirectTimer(timer)
    }

    const checkIsOnRedirecting = () => getAutoRedirectTimerSnap()

    // eslint-disable-next-line no-console
    const res = mock
        ? getNextTestMessage(url)
        : await sendMessage(url, message, timeout, isEncrypt).catch(e => console.log(e))

    // if (backdropCall) closeBackdropGadget()

    if (!res) {
        if (timeoutCall) timeoutCall()
        else if (failureCall !== alertCallBack) failureCall('发送信息超时，请检查服务器!')
        // else materialAlert('发送信息超时，请检查服务器!')
        return
    }
    switch (res.status) {
        case -3:
            /****************** 已在别的地方登录 *****************/
            if (!checkIsOnRedirecting()) {
                /** 防止多端登录，主repo应该监听token变化，token为空时返回到登录界面 */
                // materialAlert(`${res.info}将在3秒后自动跳转到登录页`, 'warning')
                clearTokenTimeOut()
            }
            break
        case -2:
            /****************** 连接错误 *****************/
            failureCall('连接错误，请稍后重试！')
            break
        case -1:
            /****************** token失效 *****************/
            if (
                res.info === '错误：用户令牌失效/不存在，请重新登录！' ||
                res.info === '错误: 参数错误 userToken 不能为空'
            ) {
                if (!checkIsOnRedirecting()) {
                    failureCall('您的登录凭证已失效，请重新登录。即将为您跳转到登录页。')
                    clearTokenTimeOut()
                    return
                }
            } else failureCall(res.info)
            break
        case 0:
            successCall(res.info)
            break
        default:
            // materialAlert('返回状态码错误！', 'error')
            break
    }
}
