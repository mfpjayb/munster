export function resolve(newUrl: string): string {
    const pathname = location.pathname;
    let checkUrl = `${pathname}/${newUrl}`;
    if (newUrl.indexOf('/') === 0) {
        checkUrl = newUrl;
    }

    return checkUrl.split('/').reduce((a, v) => {
        if (v === '.') {
            return a;
        } else if (v === '..') {
            a.pop();
        } else {
            a.push(v);
        }
        return a;
    }, []).join('/');
}
