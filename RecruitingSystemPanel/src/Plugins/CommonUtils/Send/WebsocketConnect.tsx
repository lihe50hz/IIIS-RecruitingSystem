import { config } from 'Globals/Config'

export function websocketConnect(
    url: string,
    onmessage: (stream: any, ws: WebSocket) => void,
    onopen: (ws: WebSocket) => void = () => {},
    onclose: () => void = () => {},
    onerror: () => void = () => {}
) {
    const ws = new WebSocket(`${config.wsProtocol ? config.wsProtocol : 'ws'}://${url}`)
    ws.onopen = () => {
        //当WebSocket创建成功时，触发onopen事件
        // eslint-disable-next-line no-console
        console.log('websocket' + '(' + url + ')' + ' open!')
        onopen(ws)
    }
    ws.onmessage = e => {
        //当客户端收到服务端发来的消息时，触发onmessage事件，参数e.data包含server传递过来的数据
        onmessage(e.data, ws)
    }
    ws.onclose = () => {
        //当客户端收到服务端发送的关闭连接请求时，触发onclose事件
        // eslint-disable-next-line no-console
        console.log('websocket' + '(' + url + ')' + ' close!')
        onclose()
    }
    ws.onerror = () => {
        // eslint-disable-next-line no-console
        console.log('websocket' + '(' + url + ')' + '连接失败！')
        onerror()
    }
    return ws
}
