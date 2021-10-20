import { Container } from "../container";

export function unregister(Target: any): void {
    const container = new Container();
    container.unregister(Target);
}