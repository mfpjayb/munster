import { Container } from "../container";

export function register(Target: any, option: { singleton: boolean; }): void {
    const container = new Container();
    container.register(Target, option);
}
