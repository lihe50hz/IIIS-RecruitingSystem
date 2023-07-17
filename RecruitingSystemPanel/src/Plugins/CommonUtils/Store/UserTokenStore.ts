import create from 'zustand'

const userTokenStore = create(() => ({
    userToken: '',
}))

export const setUserToken = (userToken: string) => userTokenStore.setState({ userToken })
export const usUserToken = () => userTokenStore(s => s.userToken)
export const getUserTokenSnap = () => userTokenStore.getState().userToken
