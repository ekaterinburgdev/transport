export function isValueInObject(obj: Object, value: unknown): boolean {
    return Object.values(obj).includes(value);
}
