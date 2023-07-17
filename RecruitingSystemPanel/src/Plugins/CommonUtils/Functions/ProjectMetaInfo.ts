declare const __CURRENT_BRANCH__: string

export const WebFunnyEnv = {
    dev: '开发',
    sit: '测试',
    stag: '预发布',
    pro: '生产',
}
/* webfunny 监控系统环境类型 */
export type WebFunnyEnvType = keyof typeof WebFunnyEnv
let CURRENT_BRANCH = ''
try {
    CURRENT_BRANCH = __CURRENT_BRANCH__
} catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e, '__CURRENT_BRANCH__未定义')
}
const branchToWebFunnyEnv = new Map<string, WebFunnyEnvType>([
    ['test1', 'dev'],
    ['dev', 'sit'],
    ['master', 'pro'],
    ['feat-demo', 'pro'],
])

const defaultWebFunnyEnv = 'dev'
export const getCurrentEnv = (): WebFunnyEnvType => {
    if (CURRENT_BRANCH) {
        if (branchToWebFunnyEnv.has(CURRENT_BRANCH)) {
            return branchToWebFunnyEnv.get(CURRENT_BRANCH) as WebFunnyEnvType
        } else {
            return defaultWebFunnyEnv
        }
    } else {
        // eslint-disable-next-line no-console
        console.warn('CURRENT_BRANCH undefined.')
        return defaultWebFunnyEnv
    }
}

export const getCurrentBranch = () => {
    if (CURRENT_BRANCH) {
        return CURRENT_BRANCH
    } else {
        // eslint-disable-next-line no-console
        console.warn('CURRENT_BRANCH undefined.')
        return 'dev'
    }
}
