export function isNumeric(str: string): boolean {
    return !Number.isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

export function prettyRound(value: number, precision: number = 2): number {
    const base = 10 ** precision
    return Math.round(value * base) / base
}

export function enumContains<T extends string, V extends number | string>(
    enumType: { [key in T]: V },
    query: string
): boolean {
    return Object.values(enumType).includes(query as unknown as typeof enumType)
}

export function positiveNumber(amount: string): string {
    return amount.replace(/[^.\d]/g, '')
}

export function positiveInt(amount: string): string {
    return amount.replace(/[^\d]/g, '')
}

export const sumAll = (list: number[]) => {
    let sum = 0
    for (const item of list) {
        sum += item
    }
    return sum
}
