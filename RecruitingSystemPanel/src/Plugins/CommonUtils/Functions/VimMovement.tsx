import create, { SetState } from 'zustand'
import React from 'react'

export const useVimStore = create((set: SetState<{ lastGHit: number; setLastGHit: (time: number) => void }>) => ({
    lastGHit: 0,
    setLastGHit: (time: number) => set({ lastGHit: time }),
}))

export function VimMovement(
    e: KeyboardEvent | React.KeyboardEvent,
    upOrDown: (goUp: boolean, swapNode: boolean, step: number) => void
) {
    const currentTime: number = new Date().getTime()
    const { lastGHit, setLastGHit } = useVimStore.getState()
    const gInterval: number = currentTime - lastGHit
    if (e.key === 'g') setLastGHit(currentTime)

    switch (e.key) {
        /** 向下走或者交换一下节点位置 */
        case 'ArrowDown':
            e.preventDefault()
            if (e.ctrlKey) {
                upOrDown(false, true, 1)
            } else upOrDown(false, false, 1)
            break
        case 'j':
            e.preventDefault()
            if (e.ctrlKey) {
                upOrDown(false, true, 1)
            } else if (!e.altKey) upOrDown(false, false, 1)
            break

        /** 翻页或者删除 */
        case 'd':
            if (e.ctrlKey) {
                e.preventDefault()
                upOrDown(false, false, 30)
            }
            break

        /** 向上走或者交换节点位置 */
        case 'ArrowUp':
            e.preventDefault()
            if (e.ctrlKey) {
                upOrDown(true, true, 1)
            } else upOrDown(true, false, 1)
            break
        case 'k':
            e.preventDefault()
            if (e.ctrlKey) {
                upOrDown(true, true, 1)
            } else if (!e.altKey) upOrDown(true, false, 1)
            break

        case 'G':
            e.preventDefault()
            upOrDown(false, false, 1000)
            break

        /** 向上或者向下大翻页 */
        case 'g':
            if (gInterval < 300) {
                e.preventDefault()
                upOrDown(true, false, 1000)
            }
            break

        /** 向上翻页 */
        case 'u':
            if (e.ctrlKey) {
                e.preventDefault()
                upOrDown(true, false, 30)
            }
            break
    }
}
