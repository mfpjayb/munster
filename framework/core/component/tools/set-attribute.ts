export function setAttribute(element: Element, key: string, value: any): void {
    let directSet = ['value'];
    if (directSet.indexOf(key) > -1) {
        element[key] = value;
    } else {
        element.setAttribute(key, value);
    }
}