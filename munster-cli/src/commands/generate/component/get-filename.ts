export function getFilename(filepath: string): string {
    const pathArr = filepath.split('/');
    return pathArr[pathArr.length - 1];
}
