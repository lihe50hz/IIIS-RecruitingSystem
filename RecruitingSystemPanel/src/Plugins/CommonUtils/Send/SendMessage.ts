import { ReplyMessage } from "Plugins/CommonUtils/Send/ReplyMessage";
import { replacer } from "Plugins/CommonUtils/Functions/DeepCopy"; //replacePassword,
import { MD5 } from "crypto-js";
import { Message } from "Plugins/CommonUtils/Send/Serializable";
// import { requireEncryption } from 'Plugins/CommonUtils/Encryption/EncryptionUtils'
// import { decrypt, encrypt } from 'Plugins/CommonUtils/Encryption/Encryption'

export async function sendMessage(
    url: string,
    msg: Message,
    timeout: number,
    isEncrypt: boolean = true // 是否加密，可以从message力度控制
): Promise<ReplyMessage> {
    // const encryption = requireEncryption()
    // if (!encryption) {
    //     // eslint-disable-next-line no-console
    //     console.groupCollapsed(`Sending To ${url.split('api/').slice(-1)}`)
    //     // eslint-disable-next-line no-console
    //     console.log(JSON.stringify(msg, replacePassword))
    //     // eslint-disable-next-line no-console
    //     console.groupEnd()
    // }
    console.log('isEncrypt', isEncrypt)

    return new Promise((resolve, reject) => {
        let status = 0
        const timer = setTimeout(() => {
            if (status === 0) {
                status = 2
                reject('连接已超时！')
            }
        }, timeout)

        const body = JSON.stringify(msg, replacer)

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Hash': MD5(body).toString(),
            },
            body: body,
        })
            .then(response => {
                if (response.ok) {
                    return response.text()
                } else reject('Local service not started！')
            })
            .then(res => {
                if (status !== 2) {
                    clearTimeout(timer)
                    try {
                        resolve(JSON.parse(res as string))
                    } catch (e) {
                        resolve(JSON.parse(res as string))
                    }
                    status = 1
                }
            })
            .catch(error => reject(error))
    })
}

export async function getMessage(url: string, timeout: number): Promise<any> {
    return new Promise((resolve, reject) => {
        let status = 0
        const timer = setTimeout(() => {
            if (status === 0) {
                status = 2
                reject('连接已超时！' + url)
            }
        }, timeout)

        fetch(url, {
            method: 'GET',
            headers: {},
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    return reject('Local service not started！')
                }
            })
            .then(res => {
                if (status !== 2) {
                    clearTimeout(timer)
                    resolve(res)
                    status = 1
                }
            })
            .catch(error => reject(error))
    })
}
