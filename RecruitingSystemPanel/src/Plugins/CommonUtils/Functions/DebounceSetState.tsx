import React from 'react'

export function debounceSetState<T>(fn: React.Dispatch<React.SetStateAction<T>>, wait: number = 200) {
    let lastFn: ReturnType<typeof setTimeout>
    return function (param: T) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias,@typescript-eslint/ban-ts-comment
        // @ts-ignore
        const context = this as any,
            args = param
        clearTimeout(lastFn)
        lastFn = setTimeout(() => {
            fn.call(context, args)
        }, wait)
    }
}
