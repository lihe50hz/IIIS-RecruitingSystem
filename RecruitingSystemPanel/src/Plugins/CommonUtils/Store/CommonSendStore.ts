import create from 'zustand'

const commonSendStore = create(() => ({
    autoRedirectTimer: null as null | NodeJS.Timer,
}))

export const setAutoRedirectTimer = (autoRedirectTimer: null | NodeJS.Timer) =>
    commonSendStore.setState({ autoRedirectTimer })
export const useAutoRedirectTimer = () => commonSendStore(s => s.autoRedirectTimer)
export const getAutoRedirectTimerSnap = () => commonSendStore.getState().autoRedirectTimer
