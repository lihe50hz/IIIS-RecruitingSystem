import { useHistory } from 'react-router'

export const redirect = (url: string, history: ReturnType<typeof useHistory>) => {
    history.push(url)
}

export const redirectWithPara = <T,>(url: string, history: ReturnType<typeof useHistory>, para: T) => {
    history.push({
        pathname: url,
        state: para,
    })
}
