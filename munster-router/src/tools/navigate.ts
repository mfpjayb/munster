export function navigate(url: string, data?: object, title?: string) {
    history.pushState(data, title, url);
}