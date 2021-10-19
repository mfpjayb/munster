export function kebabToCamel(str: string): string {
    return str.replace(/-./g, x=>x.toUpperCase()[1]);
}
