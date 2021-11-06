import { Container } from "../container";


export function resolve<T>(Target: any, key: string = null): T {
    const container = new Container();
    return container.resolve(Target, key);
}