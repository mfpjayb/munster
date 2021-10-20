import { Container } from "../container";


export function resolve<T>(Target: any): T {
    const container = new Container();
    return container.resolve(Target);
}