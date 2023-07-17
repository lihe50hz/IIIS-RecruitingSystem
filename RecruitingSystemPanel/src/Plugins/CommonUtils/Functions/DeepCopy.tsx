function getClass(o: any) {
    //判断数据类型
    return Object.prototype.toString.call(o).slice(8, -1)
}

export function deepCopy(obj: any) {
    let result: any
    const oClass = getClass(obj)

    if (oClass === 'Object') result = {}
    //判断传入的如果是对象，继续遍历
    else if (oClass === 'Array') result = []
    //判断传入的如果是数组，继续遍历
    else return obj //如果是基本数据类型就直接返回

    for (const i in obj) {
        const copy = obj[i]

        if (getClass(copy) === 'Object') result[i] = deepCopy(copy)
        //递归方法 ，如果对象继续变量obj[i],下一级还是对象，就obj[i][i]
        else if (getClass(copy) === 'Array') result[i] = deepCopy(copy)
        //递归方法 ，如果对象继续数组obj[i],下一级还是数组，就obj[i][i]
        else result[i] = copy //基本数据类型则赋值给属性
    }

    return result
}

export function deepCopyMap<T, V>(map: Map<T, V>): Map<T, V> {
    const result = new Map<T, V>()
    map.forEach((value: V, key: T) => result.set(key, deepCopy(value)))
    return result
}

export function replacer(key: any, value: any) {
    if (value instanceof Map) {
        const a = {} as any
        value.forEach((v, k) => (a[k] = v))
        return a
    } else {
        return value
    }
}

export function replacePassword(key: any, value: any) {
    if (value instanceof Map) {
        const a = {} as any
        value.forEach((v, k) => (a[k] = v))
        return a
    }
    if (key === 'serializedInfo') {
        const b = JSON.parse(value) as any
        if ('password' in b) {
            b.password = ''
            return JSON.stringify(b)
        }
        return value
    } else {
        return value
    }
}

/* 复制 */
export function commonDeepClone(target: any, hash = new WeakMap()) {
    if (target === null) return target
    if (target instanceof Date) return new Date(target)
    if (target instanceof HTMLElement) return target
    if (typeof target !== 'object') return target

    if (hash.get(target)) return hash.get(target)
    const cloneTarget = new target.constructor()
    hash.set(target, cloneTarget)

    if (target instanceof Map) {
        target.forEach((value, key) => {
            cloneTarget.set(key, commonDeepClone(value, hash))
        })
        return cloneTarget
    }
    if (target instanceof Set) {
        target.forEach(value => {
            cloneTarget.add(commonDeepClone(value, hash))
        })
    }

    Reflect.ownKeys(target).forEach(key => {
        cloneTarget[key] = commonDeepClone(target[key], hash)
    })
    return cloneTarget
}
