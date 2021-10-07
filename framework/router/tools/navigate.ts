import { resolve } from 'path';

export function navigate(url: string, data?: object, title?: string) {
    history.pushState(data, title, resolve(location.pathname, url));
}