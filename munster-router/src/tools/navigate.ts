import { resolve } from "./resolve";

export function navigate(url: string, data?: object, title?: string) {
    history.pushState(data, title, resolve(url));
}
