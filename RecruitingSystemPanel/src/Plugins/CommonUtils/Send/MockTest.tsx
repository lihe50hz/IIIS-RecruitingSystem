import { ReplyMessage } from 'Plugins/CommonUtils/Send/ReplyMessage'

export let testPointer = {} as any
export let testMessage: (url: string, pointer: number) => string = () => ''
testPointer = {}
testMessage = () => ''

export function getNextTestMessage(url: string) {
    if (!(url in testPointer)) testPointer[url] = 0
    const answer = testMessage(url, testPointer[url])
    testPointer[url] = testPointer[url] + 1
    return new ReplyMessage(0, answer, '')
}
